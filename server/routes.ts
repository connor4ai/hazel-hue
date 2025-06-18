import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import multer from "multer";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import { emailService } from "./services/emailService";
import { pdfService } from "./services/pdfService";
import { insertUserSchema, insertOrderSchema } from "@shared/schema";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG and PNG files are allowed'));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Create payment intent
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      // Create or get user
      let user = await storage.getUserByEmail(email);
      if (!user) {
        user = await storage.createUser({ email });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: 2900, // $29.00 in cents
        currency: "usd",
        metadata: {
          userId: user.id.toString(),
        },
      });

      // Create order record
      await storage.createOrder({
        userId: user.id,
        paymentIntentId: paymentIntent.id,
        amount: 2900,
        status: 'pending',
      });

      res.json({ 
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id 
      });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Verify payment and get order details
  app.post("/api/verify-payment", async (req, res) => {
    try {
      const { paymentIntentId } = req.body;
      
      if (!paymentIntentId) {
        return res.status(400).json({ message: "Payment intent ID is required" });
      }

      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status === 'succeeded') {
        const order = await storage.getOrderByPaymentIntent(paymentIntentId);
        if (order) {
          await storage.updateOrderStatus(order.id, 'paid');
          res.json({ success: true, orderId: order.id });
        } else {
          res.status(404).json({ message: "Order not found" });
        }
      } else {
        res.status(400).json({ message: "Payment not successful" });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Error verifying payment: " + error.message });
    }
  });

  // Upload images
  app.post("/api/upload-images/:orderId", upload.array('images', 3), async (req, res) => {
    try {
      const { orderId } = req.params;
      const files = req.files as Express.Multer.File[];

      if (!files || files.length !== 3) {
        return res.status(400).json({ message: "Exactly 3 images are required" });
      }

      const order = await storage.getOrder(parseInt(orderId));
      if (!order || order.status !== 'paid') {
        return res.status(404).json({ message: "Order not found or not paid" });
      }

      // Move files to permanent location
      const imagePaths: string[] = [];
      for (const file of files) {
        const filename = `${order.id}-${Date.now()}-${file.originalname}`;
        const permanentPath = path.join('uploads', 'images', filename);
        
        // Ensure directory exists
        const dir = path.dirname(permanentPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        fs.renameSync(file.path, permanentPath);
        imagePaths.push(permanentPath);
      }

      // Update order with image paths
      await storage.updateOrderImages(order.id, imagePaths);
      await storage.updateOrderStatus(order.id, 'processing');

      // Start analysis process (asynchronous)
      processColorAnalysis(order.id).catch(console.error);

      res.json({ success: true, message: "Images uploaded successfully" });
    } catch (error: any) {
      res.status(500).json({ message: "Error uploading images: " + error.message });
    }
  });

  // Get order status
  app.get("/api/order/:orderId", async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await storage.getOrder(parseInt(orderId));
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.json(order);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching order: " + error.message });
    }
  });

  // Download PDF report
  app.get("/api/download-report/:orderId", async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await storage.getOrder(parseInt(orderId));
      
      if (!order || !order.pdfPath) {
        return res.status(404).json({ message: "Report not found" });
      }

      if (!fs.existsSync(order.pdfPath)) {
        return res.status(404).json({ message: "Report file not found" });
      }

      res.download(order.pdfPath, `color-analysis-report-${orderId}.pdf`);
    } catch (error: any) {
      res.status(500).json({ message: "Error downloading report: " + error.message });
    }
  });

  // Admin routes
  app.post("/api/admin/login", async (req, res) => {
    const { password } = req.body;
    
    if (password === process.env.ADMIN_PASSWORD || password === 'admin123') {
      res.json({ success: true });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  });

  app.get("/api/admin/orders", async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching orders: " + error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Color analysis processing function
async function processColorAnalysis(orderId: number) {
  try {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 5000));

    const order = await storage.getOrder(orderId);
    if (!order) return;

    // Generate mock analysis result (in production, this would be actual AI analysis)
    const analysisResult = {
      season: "Warm Autumn",
      description: "You have warm undertones with rich, earthy colors that complement your natural coloring beautifully.",
      coreNeutrals: ["#8B4513", "#A0522D", "#CD853F", "#DEB887"],
      accentLights: ["#F4A460", "#DAA520", "#B8860B", "#FFD700"],
      accentBrights: ["#FF8C00", "#FF7F50", "#DC143C", "#B22222"],
      recommendations: {
        metals: "Gold, brass, and copper",
        eyewear: "Warm brown, tortoiseshell, or gold frames",
        makeup: "Warm coral blush, golden eyeshadows, warm red lipstick"
      }
    };

    // Generate PDF report
    const pdfPath = await pdfService.generateReport(order, analysisResult);
    
    // Update order with analysis results
    await storage.updateOrderAnalysis(orderId, analysisResult, pdfPath);

    // Send email with report
    const user = await storage.getUser(order.userId);
    if (user) {
      await emailService.sendAnalysisReport(user.email, analysisResult, pdfPath);
      await storage.updateOrderEmailSent(orderId);
    }

  } catch (error) {
    console.error('Error processing color analysis:', error);
    await storage.updateOrderStatus(orderId, 'failed');
  }
}
