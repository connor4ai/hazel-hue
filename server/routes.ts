import type { Express, Request, Response, NextFunction } from "express";
import express from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import multer from "multer";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import { emailService } from "./services/emailService";
import { premiumPdfService } from "./services/premiumPdfService";
import { walletCardService } from "./services/walletCardService";
import { preloadedColorAnalysisService } from "./services/preloadedColorAnalysis";
import { fashionApiService } from "./services/fashionApiService";
import { insertUserSchema, insertOrderSchema, registerUserSchema, loginSchema } from "@shared/schema";

// Initialize Stripe only if key is available
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
}

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

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

// Authentication middleware
const authenticateUser = async (req: any, res: any, next: any) => {
  const sessionToken = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.sessionToken;
  
  if (!sessionToken) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const user = await storage.getUserFromSession(sessionToken);
  if (!user) {
    return res.status(401).json({ message: "Invalid or expired session" });
  }

  req.user = user;
  next();
};

// Worker function that processes the job after photos are uploaded
async function processColorAnalysisWorker(jobId: number) {
  try {
    console.log(`Starting worker for job ${jobId}`);
    
    const order = await storage.getOrder(jobId);
    if (!order || !order.images) {
      throw new Error('Job or images not found');
    }

    // Update status to processing
    await storage.updateOrderStatus(jobId, 'processing');

    // Call OpenAI with the images
    const imagePaths = Array.isArray(order.images) ? order.images : [];
    const analysisResult = await preloadedColorAnalysisService.analyzePhotos(imagePaths);
    console.log(`OpenAI analysis completed for job ${jobId}`);

    // Generate PDF report
    const pdfPath = await premiumPdfService.generateReport(order, analysisResult);
    console.log(`PDF generated for job ${jobId}`);

    // Save outputs and mark as completed
    await storage.updateOrderAnalysis(jobId, analysisResult, pdfPath);
    await storage.updateOrderStatus(jobId, 'completed');

    console.log(`Job ${jobId} completed successfully`);
  } catch (error: any) {
    console.error(`Error processing job ${jobId}:`, error);
    await storage.updateOrderStatus(jobId, 'failed');
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // User registration
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = registerUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      const user = await storage.registerUser(
        userData.email,
        userData.password,
        userData.firstName,
        userData.lastName
      );

      const sessionToken = await storage.createSession(user.id);
      
      res.cookie('sessionToken', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'lax'
      });

      res.json({
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        sessionToken
      });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Registration failed: " + error.message });
    }
  });

  // User login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const loginData = loginSchema.parse(req.body);
      
      const user = await storage.authenticateUser(loginData.email, loginData.password);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const sessionToken = await storage.createSession(user.id);
      
      res.cookie('sessionToken', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'lax'
      });

      res.json({
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        sessionToken
      });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Login failed: " + error.message });
    }
  });

  // User logout
  app.post("/api/auth/logout", authenticateUser, async (req: any, res) => {
    try {
      const sessionToken = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.sessionToken;
      if (sessionToken) {
        await storage.deleteSession(sessionToken);
      }
      
      res.clearCookie('sessionToken');
      res.json({ message: "Logged out successfully" });
    } catch (error: any) {
      res.status(500).json({ message: "Logout failed: " + error.message });
    }
  });

  // Get current user
  app.get("/api/auth/me", authenticateUser, async (req: any, res) => {
    res.json({
      user: {
        id: req.user.id,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
      }
    });
  });

  // Get user order history
  app.get("/api/auth/orders", authenticateUser, async (req: any, res) => {
    try {
      const orders = await storage.getUserOrders(req.user.id);
      res.json({ orders });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch orders: " + error.message });
    }
  });

  // Create payment intent
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      if (!stripe) {
        return res.status(503).json({ 
          message: "Payment processing temporarily unavailable. Please configure Stripe keys." 
        });
      }

      const { promoCode } = req.body;
      let amount = 2900; // $29.00 in cents
      let discount = 0;

      // Apply promo code discounts
      if (promoCode) {
        const validPromoCodes: Record<string, number> = {
          'CONNOR': 100, // 100% off (free)
        };

        if (validPromoCodes[promoCode.toUpperCase()]) {
          discount = validPromoCodes[promoCode.toUpperCase()];
          amount = Math.round(amount * (1 - discount / 100));
        }
      }

      // Handle free orders (100% discount)
      if (amount === 0) {
        // Create a mock payment intent ID for free orders
        const freeOrderId = `free_order_${Date.now()}`;
        
        // Create order record for free order
        await storage.createOrder({
          userId: 1, // Default user for guest orders
          paymentIntentId: freeOrderId,
          amount: 0,
          status: 'completed',
        });

        res.json({ 
          clientSecret: null, // No payment required
          paymentIntentId: freeOrderId,
          amount: 0,
          discount: discount,
          isFree: true
        });
      } else {
        const paymentIntent = await stripe!.paymentIntents.create({
          amount,
          currency: "usd",
          automatic_payment_methods: {
            enabled: true,
          },
          metadata: {
            service: 'color-analysis',
            originalAmount: '2900',
            promoCode: promoCode || '',
            discount: discount.toString(),
            amount: amount.toString(),
          },
        });

        // Create order record with default user
        await storage.createOrder({
          userId: 1, // Default user for guest orders
          paymentIntentId: paymentIntent.id,
          amount: 2900,
          status: 'pending',
        });

        res.json({ 
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          discount: discount
        });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Get payment intent details
  app.get("/api/payment-intent/:paymentIntentId", async (req, res) => {
    try {
      if (!stripe) {
        return res.status(503).json({ 
          message: "Payment processing temporarily unavailable." 
        });
      }

      const { paymentIntentId } = req.params;
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      res.json({
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        metadata: paymentIntent.metadata
      });
    } catch (error: any) {
      res.status(500).json({ message: "Error retrieving payment intent: " + error.message });
    }
  });

  // Verify payment and get order details
  app.post("/api/verify-payment", async (req, res) => {
    try {
      if (!stripe) {
        return res.status(503).json({ 
          message: "Payment processing temporarily unavailable. Please configure Stripe keys." 
        });
      }

      const { paymentIntentId } = req.body;
      
      if (!paymentIntentId) {
        return res.status(400).json({ message: "Payment intent ID is required" });
      }

      const paymentIntent = await stripe!.paymentIntents.retrieve(paymentIntentId);
      
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

  // Start free order analysis with images from memory
  app.post("/api/start-free-analysis/:orderId", async (req, res) => {
    try {
      const { orderId } = req.params;
      const { images, email } = req.body; // Base64 image data or email
      
      // For CONNOR promo code, create a free order
      if (email && !images) {
        const freeOrder = await storage.createOrder({
          email: email,
          paymentIntentId: orderId,
          amount: 0,
          status: 'paid'
        });
        
        // Use dummy images for demo
        const dummyImages = ['demo1.jpg', 'demo2.jpg', 'demo3.jpg'];
        await storage.updateOrderImages(freeOrder.id, dummyImages);
        
        // Start analysis immediately
        setImmediate(() => processColorAnalysisWorker(freeOrder.id));
        
        return res.json({ message: "Free analysis started", status: "processing", orderId: freeOrder.id });
      }
      
      if (!images || images.length < 3) {
        return res.status(400).json({ message: "At least 3 images are required" });
      }

      // Get the free order
      const order = await storage.getOrderByPaymentIntent(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Save images to disk for processing
      const imagePaths: string[] = [];
      for (let i = 0; i < images.length; i++) {
        const imageData = images[i];
        const fileName = `${orderId}_${i + 1}.jpg`;
        const filePath = path.join(uploadsDir, fileName);
        
        // Convert base64 to file
        const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '');
        fs.writeFileSync(filePath, base64Data, 'base64');
        imagePaths.push(filePath);
      }

      // Update order with images
      await storage.updateOrderImages(order.id, imagePaths);
      await storage.updateOrderStatus(order.id, 'processing');

      // Start analysis
      setImmediate(() => processColorAnalysisWorker(order.id));

      res.json({ message: "Analysis started", status: "processing" });
    } catch (error: any) {
      console.error("Error starting free analysis:", error);
      res.status(500).json({ message: "Error starting analysis: " + error.message });
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

  // Get order status (for free orders too)
  app.get("/api/orders/:orderId/status", async (req, res) => {
    try {
      const { orderId } = req.params;
      
      // Handle free order IDs (string format)
      let order;
      if (orderId.startsWith('free_order_')) {
        order = await storage.getOrderByPaymentIntent(orderId);
      } else {
        order = await storage.getOrder(parseInt(orderId));
      }
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      const response: any = {
        id: order.id,
        status: order.status,
        updatedAt: order.updatedAt
      };

      // Include results when done
      if (order.status === 'completed' && order.analysisResult) {
        response.result = order.analysisResult;
        response.pdfPath = order.pdfPath;
      }

      res.json(response);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching order: " + error.message });
    }
  });

  // Get order by ID
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

  // Download premium PDF report
  app.get("/api/orders/:orderId/pdf", async (req, res) => {
    try {
      const { orderId } = req.params;
      let order;
      
      if (orderId.startsWith('free_order_')) {
        order = await storage.getOrderByPaymentIntent(orderId);
      } else {
        order = await storage.getOrder(parseInt(orderId));
      }
      
      if (!order || order.status !== 'completed' || !order.analysisResult) {
        return res.status(404).json({ message: "Analysis not found" });
      }

      console.log('Generating PDF for order:', order.id, 'with analysis:', order.analysisResult);
      const pdfPath = await designerPdfService.generateReport(order, order.analysisResult);
      
      if (!fs.existsSync(pdfPath)) {
        return res.status(500).json({ message: "Failed to generate PDF" });
      }

      res.setHeader('Content-Type', 'application/pdf');
      const seasonName = (order.analysisResult as any)?.season || 'Color-Analysis';
      res.setHeader('Content-Disposition', `attachment; filename="${seasonName.replace(/\s+/g, '-')}-Professional-Report.pdf"`);
      
      const fileStream = fs.createReadStream(pdfPath);
      fileStream.pipe(res);
      
      fileStream.on('end', () => {
        setTimeout(() => {
          if (fs.existsSync(pdfPath)) {
            fs.unlinkSync(pdfPath);
          }
        }, 1000);
      });
    } catch (error: any) {
      console.error("Error generating premium PDF:", error);
      console.error("Error stack:", error.stack);
      res.status(500).json({ message: "Failed to generate professional report", error: error.message });
    }
  });

  // Generate Apple Wallet card
  app.get("/api/orders/:orderId/wallet-card", async (req, res) => {
    try {
      const { orderId } = req.params;
      let order;
      
      if (orderId.startsWith('free_order_')) {
        order = await storage.getOrderByPaymentIntent(orderId);
      } else {
        order = await storage.getOrder(parseInt(orderId));
      }
      
      if (!order || order.status !== 'completed' || !order.analysisResult) {
        return res.status(404).json({ message: "Analysis not found" });
      }

      const walletCardPath = await walletCardService.generateWalletPass(order.analysisResult, orderId);
      
      if (!fs.existsSync(walletCardPath)) {
        return res.status(500).json({ message: "Failed to generate wallet card" });
      }

      res.setHeader('Content-Type', 'application/vnd.apple.pkpass');
      const walletSeasonName = (order.analysisResult as any)?.season || 'Color-Analysis';
      res.setHeader('Content-Disposition', `attachment; filename="${walletSeasonName.replace(/\s+/g, '-')}-Color-Card.pkpass"`);
      
      const fileStream = fs.createReadStream(walletCardPath);
      fileStream.pipe(res);
      
      fileStream.on('end', () => {
        setTimeout(() => {
          if (fs.existsSync(walletCardPath)) {
            fs.unlinkSync(walletCardPath);
          }
        }, 1000);
      });
    } catch (error: any) {
      console.error("Error generating wallet card:", error);
      res.status(500).json({ message: "Failed to generate wallet card" });
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

  // Step 1: Create checkout session for payment (before photos)
  app.post("/api/create-checkout", async (req, res) => {
    try {
      if (!stripe) {
        return res.status(500).json({ message: "Stripe not configured" });
      }

      // Create a checkout session that redirects to loading page
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Personal Color Analysis',
                description: 'Professional 16-season color analysis with personalized PDF report',
              },
              unit_amount: 2900, // $29.00
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/loading?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/upload`,
        automatic_tax: { enabled: false },
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Error creating checkout:", error);
      res.status(500).json({ message: "Failed to create checkout: " + error.message });
    }
  });

  // Step 2: Handle successful payment webhook from Stripe
  app.post("/api/webhook", express.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
        return res.status(400).send('Webhook secret not configured');
      }
      
      event = stripe.webhooks.constructEvent(req.body, sig!, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err: any) {
      console.log(`Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('Payment succeeded for session:', session.id);
      
      // Create job entry in database
      const order = await storage.createOrder({
        userId: 1, // Default user for now
        paymentIntentId: session.payment_intent as string,
        amount: 2900,
        status: 'queued',
      });

      console.log(`Created job ${order.id} for payment session ${session.id}`);
    }

    res.json({received: true});
  });

  // Step 3: Upload photos after payment
  app.put("/api/job/:jobId/photos", upload.array('photos', 3), async (req, res) => {
    try {
      const jobId = parseInt(req.params.jobId);
      const files = req.files as Express.Multer.File[];

      if (!files || files.length < 3) {
        return res.status(400).json({ message: "At least 3 photos are required" });
      }

      const order = await storage.getOrder(jobId);
      if (!order) {
        return res.status(404).json({ message: "Job not found" });
      }

      if (order.status !== 'queued') {
        return res.status(400).json({ message: "Job not ready for photos" });
      }

      // Save photo paths and update status
      await storage.updateOrderImages(jobId, files.map(f => f.path));
      await storage.updateOrderStatus(jobId, 'files_uploaded');

      // Start processing worker
      setImmediate(() => processColorAnalysisWorker(jobId));

      res.json({ 
        message: 'Photos uploaded successfully',
        status: 'files_uploaded'
      });
    } catch (error: any) {
      console.error("Error uploading photos:", error);
      res.status(500).json({ message: "Failed to upload photos: " + error.message });
    }
  });

  // Step 4: Poll job status (what loading page calls every 3s)
  app.get("/api/job/:jobId/status", async (req, res) => {
    try {
      const jobId = parseInt(req.params.jobId);
      const order = await storage.getOrder(jobId);

      if (!order) {
        return res.status(404).json({ message: "Job not found" });
      }

      const response: any = {
        jobId: order.id,
        status: order.status,
        updatedAt: order.updatedAt
      };

      // Include results when done
      if (order.status === 'done' && order.analysisResult) {
        response.result = order.analysisResult;
        response.pdfUrl = `/api/pdf/${order.id}`;
      }

      res.json(response);
    } catch (error: any) {
      console.error("Error getting job status:", error);
      res.status(500).json({ message: "Failed to get job status" });
    }
  });

  // Get job ID from session ID (for loading page)
  app.get("/api/session/:sessionId/job", async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      
      if (!stripe) {
        return res.status(500).json({ message: "Stripe not configured" });
      }

      // Get session details from Stripe
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      
      // Find order by payment intent
      const order = await storage.getOrderByPaymentIntent(session.payment_intent as string);
      
      if (!order) {
        return res.status(404).json({ message: "Job not found for this session" });
      }

      res.json({ jobId: order.id });
    } catch (error: any) {
      console.error("Error finding job for session:", error);
      res.status(500).json({ message: "Failed to find job" });
    }
  });

  // Download PDF report
  app.get("/api/orders/:orderId/pdf", async (req, res) => {
    try {
      const paymentIntentId = req.params.orderId;
      const order = await storage.getOrderByPaymentIntent(paymentIntentId);
      
      if (!order || !order.pdfPath) {
        return res.status(404).json({ message: "Report not found" });
      }

      if (!fs.existsSync(order.pdfPath)) {
        return res.status(404).json({ message: "Report file not found" });
      }

      res.download(order.pdfPath, `color-analysis-${order.id}.pdf`);
    } catch (error: any) {
      res.status(500).json({ message: "Error downloading report: " + error.message });
    }
  });

  // Email report
  app.post("/api/orders/:orderId/email", async (req, res) => {
    try {
      const paymentIntentId = req.params.orderId;
      const order = await storage.getOrderByPaymentIntent(paymentIntentId);
      
      if (!order || !order.analysisResult || !order.pdfPath) {
        return res.status(404).json({ message: "Complete analysis not found" });
      }

      // For now, we'll need an email address from the request body or user context
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email address required" });
      }

      await emailService.sendAnalysisReport(email, order.analysisResult, order.pdfPath);
      await storage.updateOrderEmailSent(order.id);

      res.json({ message: "Email sent successfully" });
    } catch (error: any) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send email: " + error.message });
    }
  });

  // Get outfit recommendations based on analysis results
  app.get("/api/outfits/:orderId", async (req, res) => {
    try {
      const paymentIntentId = req.params.orderId;
      const order = await storage.getOrderByPaymentIntent(paymentIntentId);
      
      if (!order || !order.analysisResult) {
        return res.status(404).json({ message: "Analysis not found" });
      }

      const outfitLooks = await fashionApiService.generateOutfitLooks(order.analysisResult as any);
      res.json(outfitLooks);
    } catch (error: any) {
      console.error("Error fetching outfits:", error);
      res.status(500).json({ message: "Failed to fetch outfits: " + error.message });
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
    const pdfPath = await premiumPdfService.generateReport(order, analysisResult);
    
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
