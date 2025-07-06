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

import { fashionApiService } from "./services/fashionApiService";
import { CompliantLabAnalysisService } from "./services/compliantLabAnalysis";
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

// Create demo images for testing (minimal valid JPEG data)
function createDemoImageBase64(personType: string): string {
  // This creates a minimal valid JPEG image (1x1 pixel in different colors to represent different people)
  const colors = {
    person1: '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
    person2: '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
    person3: '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
  };
  return colors[personType as keyof typeof colors] || colors.person1;
}

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = 'uploads/images';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      // Generate filename with job ID and timestamp
      const orderId = req.params.jobId || 'unknown';
      const timestamp = Date.now();
      const ext = path.extname(file.originalname);
      const index = (req as any).fileIndex || 1;
      cb(null, `${orderId}-${timestamp}-${index}${ext}`);
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    console.log(`🔍 File filter check: ${file.originalname}, MIME: ${file.mimetype}`);
    
    // Allow JPEG, PNG, HEIC, and HEIF files
    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/heic',
      'image/heif'
    ];
    
    // Also check file extension for HEIC files (some browsers may not set correct MIME type)
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.heic', '.heif'];
    const hasValidExtension = allowedExtensions.some(ext => 
      file.originalname.toLowerCase().endsWith(ext)
    );
    
    if (allowedMimeTypes.includes(file.mimetype) || hasValidExtension) {
      console.log(`✅ File accepted: ${file.originalname}`);
      cb(null, true);
    } else {
      console.log(`❌ File rejected: ${file.originalname} (MIME: ${file.mimetype})`);
      cb(new Error('Only JPEG, PNG, and HEIC files are allowed'));
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
    console.log(`🚀 Starting worker for job ${jobId}`);
    
    const order = await storage.getOrder(jobId);
    if (!order || !order.images) {
      throw new Error('Job or images not found');
    }

    console.log(`📋 Order found for job ${jobId}:`, {
      orderId: order.id,
      status: order.status,
      images: order.images,
      imageCount: Array.isArray(order.images) ? order.images.length : 0
    });

    // Update status to processing
    await storage.updateOrderStatus(jobId, 'processing');

    // Call compliant GPT-o3 LAB analysis with the images
    const imagePaths = Array.isArray(order.images) ? order.images : [];
    console.log(`🧠 About to call compliant analyzePhotosCompliant (GPT-o3) with paths:`, imagePaths);
    
    let analysisResult;
    
    // Use only GPT-o3 LAB analysis - no fallbacks
    const compliantService = new CompliantLabAnalysisService();
    const detectedSeason = await compliantService.analyzePhotosCompliant(imagePaths, jobId.toString());
    console.log(`AI detected season: ${detectedSeason}`);
    
    // Get full analysis result for the detected season
    analysisResult = compliantService.getPreloadedResult(detectedSeason);
    
    console.log(`✅ GPT-o3 LAB analysis completed - no fallbacks used`);
    console.log(`✅ GPT-o3 LAB analysis completed for job ${jobId}. Result:`, {
      season: analysisResult.season,
      description: analysisResult.description?.substring(0, 100) + '...'
    });

    // Generate PDF report
    const pdfPath = await premiumPdfService.generateReport(order, analysisResult);
    console.log(`PDF generated for job ${jobId}`);

    // Save outputs and mark as analyzed
    await storage.updateOrderAnalysis(jobId, analysisResult, pdfPath);
    await storage.updateOrderStatus(jobId, 'analyzed');

    // Check if this is a paid order (free orders with promo codes)
    if (order.paymentStatus === 'paid') {
      // For paid orders (including free with promo codes), mark as completed and send email
      await storage.updateOrderStatus(jobId, 'completed');
      
      if (order.email) {
        try {
          await emailService.sendAnalysisReport(order.email, analysisResult, order.id.toString());
          await storage.updateOrderEmailSent(order.id);
          console.log(`✅ GPT-o3 analysis results emailed to: ${order.email}`);
        } catch (emailError) {
          console.error("Error sending analysis email:", emailError);
        }
      }
    }

    console.log(`✅ Job ${jobId} completed successfully`);
  } catch (error: any) {
    console.error(`❌ Error processing job ${jobId}:`, error);
    console.error(`❌ Error stack:`, error.stack);
    console.error(`❌ Error details:`, {
      message: error.message,
      name: error.name,
      code: error.code
    });
    
    try {
      await storage.updateOrderStatus(jobId, 'failed');
    } catch (updateError) {
      console.error(`❌ Failed to update job status to failed:`, updateError);
    }
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Debug endpoint to test SSR and see user agents
  app.get('/debug/ssr', (req, res) => {
    const userAgent = req.get('User-Agent') || '';
    const isBot = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest\/0\.|pinterestbot|developers\.google\.com\/\+\/web\/snippet|gptbot|chatgpt-user|claude-web|perplexity|anthropic|openai|bard|gemini|bing.*ai|copilot|webscraper|scrapy|python-requests|curl|wget|httpclient|crawl|spider|bot\/|scraper|indexer|preview|parser|reader|archive|wayback|lighthouse|pagespeed|applebot|seobilitybot|ahrefsbot|semrushbot|mj12bot|dotbot|ccbot|commoncrawl|archive\.org/i.test(userAgent);
    
    res.json({
      userAgent,
      isBot,
      headers: req.headers,
      query: req.query,
      method: req.method,
      path: req.path,
      ip: req.ip
    });
  });
  // Test images page for debugging
  app.get("/test-images", (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "test_images.html"));
  });

  // Health check endpoint
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });
  
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

      const { promoCode, orderId } = req.body;
      let amount = 2900; // $29.00 in cents
      const originalAmount = amount;
      let discount = 0;
      let appliedPromoCode = null;

      // Apply promo code discounts
      if (promoCode) {
        appliedPromoCode = await storage.getPromoCodeByCode(promoCode.toUpperCase());
        
        if (appliedPromoCode && appliedPromoCode.isActive) {
          // Check if expired
          if (!appliedPromoCode.expiresAt || new Date() <= appliedPromoCode.expiresAt) {
            // Check usage limit
            if (!appliedPromoCode.usageLimit || (appliedPromoCode.usageCount || 0) < appliedPromoCode.usageLimit) {
              discount = appliedPromoCode.discountPercent;
              amount = Math.round(amount * (1 - discount / 100));
            }
          }
        }
      }

      // Handle free orders (100% discount)
      if (amount === 0) {
        // Create a mock payment intent ID for free orders
        const freeOrderId = `free_order_${Date.now()}`;
        
        // Create order record for free order
        const order = await storage.createOrder({
          userId: 1, // Default user for guest orders
          paymentIntentId: freeOrderId,
          amount: 0,
          originalAmount: originalAmount,
          promoCodeId: appliedPromoCode?.id,
          discountAmount: originalAmount,
          status: 'completed',
        });

        // Increment promo code usage count if applicable
        if (appliedPromoCode) {
          await storage.incrementPromoCodeUsage(appliedPromoCode.id);
        }

        res.json({ 
          clientSecret: null, // No payment required
          paymentIntentId: freeOrderId,
          amount: 0,
          discount: discount,
          isFree: true
        });
      } else {
        console.log('Creating payment intent with amount:', amount);
        const paymentIntent = await stripe!.paymentIntents.create({
          amount,
          currency: "usd",
          automatic_payment_methods: {
            enabled: true,
            allow_redirects: 'never'
          },
          metadata: {
            service: 'color-analysis',
            originalAmount: '2900',
            promoCode: promoCode || '',
            discount: discount.toString(),
            amount: amount.toString(),
            orderId: orderId || '',
          },
        });

        // If orderId provided, update existing order with payment intent and discount info
        if (orderId) {
          try {
            await storage.updateOrderPaymentIntent(parseInt(orderId), paymentIntent.id);
            
            // Also update the order with promo code information if applicable
            if (appliedPromoCode) {
              await storage.updateOrderPromoInfo(parseInt(orderId), {
                originalAmount: originalAmount,
                promoCodeId: appliedPromoCode.id,
                discountAmount: originalAmount - amount,
                amount: amount
              });
            }
          } catch (error) {
            console.error('Error updating order with payment intent:', error);
          }
        } else {
          // Create order record with default user for legacy flow
          await storage.createOrder({
            userId: 1, // Default user for guest orders
            paymentIntentId: paymentIntent.id,
            amount: amount, // Use the discounted amount, not hardcoded 2900
            originalAmount: originalAmount,
            promoCodeId: appliedPromoCode?.id,
            discountAmount: originalAmount - amount,
            status: 'pending',
          });
        }

        // Increment promo code usage count if applicable
        if (appliedPromoCode) {
          await storage.incrementPromoCodeUsage(appliedPromoCode.id);
        }

        res.json({ 
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          discount: discount
        });
      }
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ message: "Error creating payment intent: " + (error.message || 'Unknown error') });
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
      
      // This endpoint should only be used with actual images, not for creating demo orders
      if (email && !images) {
        return res.status(400).json({ message: "Images are required for analysis" });
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

  // Create order and start analysis immediately (new workflow)
  app.post("/api/orders", authenticateUser, upload.fields([
    { name: 'photo1', maxCount: 1 },
    { name: 'photo2', maxCount: 1 },
    { name: 'photo3', maxCount: 1 }
  ]), async (req: any, res) => {
    try {
      const user = req.user;
      const files = req.files;

      // Validate files
      if (!files || !files.photo1 || !files.photo2 || !files.photo3 || 
          files.photo1.length !== 1 || files.photo2.length !== 1 || files.photo3.length !== 1) {
        return res.status(400).json({ message: "Exactly 3 photos are required (photo1, photo2, photo3)" });
      }

      // Create unpaid order
      const order = await storage.createOrder({
        userId: user.id,
        status: 'queued',
        paymentStatus: 'unpaid',
        total: 29.00,
        email: user.email
      });

      // Save images to disk for processing
      const imagePaths: string[] = [];
      const photoFiles = [files.photo1[0], files.photo2[0], files.photo3[0]];
      
      for (let i = 0; i < photoFiles.length; i++) {
        const file = photoFiles[i];
        const filename = `${order.id}-${Date.now()}-${i + 1}.jpg`;
        const permanentPath = path.join('uploads', 'images', filename);
        
        // Ensure directory exists
        const dir = path.dirname(permanentPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        fs.renameSync(file.path, permanentPath);
        imagePaths.push(permanentPath);
      }

      // Update order with image paths and start processing
      await storage.updateOrderImages(order.id, imagePaths);
      await storage.updateOrderStatus(order.id, 'files_uploaded');

      // Start analysis immediately
      setImmediate(() => processColorAnalysisWorker(order.id));

      res.json({ 
        id: order.id, 
        status: 'files_uploaded',
        message: "Analysis started successfully" 
      });
    } catch (error: any) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Error creating order: " + error.message });
    }
  });

  // Create guest order (no authentication required)
  app.post("/api/orders/guest", upload.fields([
    { name: 'photo1', maxCount: 1 },
    { name: 'photo2', maxCount: 1 },
    { name: 'photo3', maxCount: 1 }
  ]), async (req: any, res) => {
    try {
      const files = req.files;

      // Validate files
      if (!files || !files.photo1 || !files.photo2 || !files.photo3 || 
          files.photo1.length !== 1 || files.photo2.length !== 1 || files.photo3.length !== 1) {
        return res.status(400).json({ message: "Exactly 3 photos are required (photo1, photo2, photo3)" });
      }

      // Create guest user if needed (or use a default guest user)
      let guestUserId = 1; // Default guest user
      try {
        // Try to get or create a guest user
        const guestUser = await storage.getUserByEmail('guest@hazelhueco.com');
        if (!guestUser) {
          const newGuestUser = await storage.createUser({
            email: 'guest@hazelhueco.com',
            firstName: 'Guest',
            lastName: 'User'
          });
          guestUserId = newGuestUser.id;
        } else {
          guestUserId = guestUser.id;
        }
      } catch (error) {
        console.log('Using default guest user ID');
      }

      // Create unpaid order
      console.log(`🆕 Creating fresh guest order for user ${guestUserId}`);
      const order = await storage.createOrder({
        userId: guestUserId,
        status: 'queued',
        paymentStatus: 'unpaid',
        amount: 2900, // $29.00 in cents
      });
      console.log(`📦 Fresh order created:`, { orderId: order.id, status: order.status });

      // Save images to disk for processing
      const imagePaths: string[] = [];
      const photoFiles = [files.photo1[0], files.photo2[0], files.photo3[0]];
      
      for (let i = 0; i < photoFiles.length; i++) {
        const file = photoFiles[i];
        const filename = `${order.id}-${Date.now()}-${i + 1}.jpg`;
        const permanentPath = path.join('uploads', 'images', filename);
        
        // Ensure directory exists
        const dir = path.dirname(permanentPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        fs.renameSync(file.path, permanentPath);
        imagePaths.push(permanentPath);
      }

      // Update order with image paths and start processing
      await storage.updateOrderImages(order.id, imagePaths);
      await storage.updateOrderStatus(order.id, 'files_uploaded');

      // Start analysis immediately
      console.log(`🚀 TRIGGERING GPT-o3 ANALYSIS for guest order ${order.id}`);
      setImmediate(() => processColorAnalysisWorker(order.id));

      res.json({ 
        id: order.id, 
        status: 'files_uploaded',
        message: "Analysis started successfully" 
      });
    } catch (error: any) {
      console.error("Error creating guest order:", error);
      res.status(500).json({ message: "Error creating order: " + error.message });
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

      // Start GPT-o3 analysis process (asynchronous)
      setImmediate(() => processColorAnalysisWorker(order.id));

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

  // Get order by ID (handles both numeric IDs and free order strings)
  app.get("/api/orders/:orderId", async (req, res) => {
    try {
      const { orderId } = req.params;
      
      // Validate orderId parameter
      if (!orderId || orderId === 'undefined' || orderId === 'null' || orderId === 'NaN') {
        return res.status(400).json({ message: "Invalid order ID" });
      }
      
      let order;
      if (orderId.startsWith('free_order_')) {
        order = await storage.getOrderByPaymentIntent(orderId);
      } else {
        const numericOrderId = parseInt(orderId);
        if (isNaN(numericOrderId)) {
          return res.status(400).json({ message: "Invalid order ID format" });
        }
        order = await storage.getOrder(numericOrderId);
      }
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.json({ order });
    } catch (error: any) {
      console.error('Error fetching order:', error);
      res.status(500).json({ message: "Error fetching order: " + error.message });
    }
  });

  // Legacy route for backward compatibility
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
      const pdfPath = await premiumPdfService.generateReport(order, order.analysisResult);
      
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

      // Log file details for debugging
      files.forEach((file, index) => {
        console.log(`📁 Uploaded file ${index + 1}:`);
        console.log(`   - Original name: ${file.originalname}`);
        console.log(`   - MIME type: ${file.mimetype}`);
        console.log(`   - Size: ${file.size} bytes`);
        console.log(`   - Saved path: ${file.path}`);
        console.log(`   - Filename: ${file.filename}`);
      });

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

  // Download color palette PDF
  app.post("/api/orders/:orderId/download-palette", async (req: Request, res: Response) => {
    try {
      const order = await storage.getOrder(parseInt(req.params.orderId));
      if (!order || !order.analysisResult) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Create PDF with jsPDF
      const { jsPDF } = require('jspdf');
      const pdf = new jsPDF();
      
      // Title
      pdf.setFontSize(24);
      pdf.text("TRUE WINTER COLOR PALETTE", 20, 30);
      
      // Subtitle
      pdf.setFontSize(12);
      pdf.text("Complete 64-Color Professional Palette", 20, 45);
      
      // Color grid with full palette
      const colors = [
        { name: 'Ice White', code: '#E8E8E8' },
        { name: 'Cool Grey', code: '#6B7B7B' },
        { name: 'Icy Yellow', code: '#FCE4B8' },
        { name: 'Emerald', code: '#4D9B4D' },
        { name: 'Teal', code: '#2E5F5F' },
        { name: 'Bright Pink', code: '#FFB8E8' },
        { name: 'Fuchsia', code: '#E85AA0' },
        { name: 'Eggplant', code: '#5A3D5A' },
        { name: 'Silver', code: '#D4D4D4' },
        { name: 'Charcoal', code: '#4A4A4A' },
        { name: 'Lemon', code: '#FCFC1C' },
        { name: 'Forest Green', code: '#1C7A1C' },
        { name: 'Petrol', code: '#1C5F7A' },
        { name: 'Hot Pink', code: '#E85AA0' },
        { name: 'Magenta', code: '#B8207A' },
        { name: 'Purple', code: '#7A3D7A' },
        { name: 'Icy Blue', code: '#F0F8FF' },
        { name: 'True Black', code: '#1C1C1C' },
        { name: 'Bright Yellow', code: '#E8E81C' },
        { name: 'Kelly Green', code: '#3D9B3D' },
        { name: 'Turquoise', code: '#1C7A9B' },
        { name: 'Pale Pink', code: '#FFE8FC' },
        { name: 'Shocking Pink', code: '#E85A9B' },
        { name: 'Royal Purple', code: '#9B3D9B' },
        { name: 'Light Grey', code: '#B8B8B8' },
        { name: 'Graphite', code: '#2C2C2C' },
        { name: 'Electric Blue', code: '#1CE8FC' },
        { name: 'Pine Green', code: '#0F4F0F' },
        { name: 'Navy Blue', code: '#1C1C7A' },
        { name: 'Rose Pink', code: '#FC9BE8' },
        { name: 'Burgundy', code: '#7A1C3D' },
        { name: 'Deep Purple', code: '#4F1C4F' },
        { name: 'Pearl', code: '#F0F0F0' },
        { name: 'Jet Black', code: '#0A0A0A' },
        { name: 'Acid Yellow', code: '#D4FC1C' },
        { name: 'Jade', code: '#1C9B5F' },
        { name: 'Cobalt', code: '#1C3D7A' },
        { name: 'Orchid', code: '#DA70D6' },
        { name: 'Wine', code: '#5F1C1C' },
        { name: 'Violet', code: '#3D1C5F' },
        { name: 'Platinum', code: '#E5E4E2' },
        { name: 'Obsidian', code: '#141414' },
        { name: 'Citrine', code: '#E4D00A' },
        { name: 'Malachite', code: '#0BDA51' },
        { name: 'Sapphire', code: '#0F52BA' },
        { name: 'Peony', code: '#F8BBD9' },
        { name: 'Crimson', code: '#DC143C' },
        { name: 'Amethyst', code: '#9966CC' },
        { name: 'Cool Beige', code: '#F5F5DC' },
        { name: 'Carbon', code: '#36454F' },
        { name: 'Canary', code: '#FFFF99' },
        { name: 'Viridian', code: '#40826D' },
        { name: 'Steel Blue', code: '#4682B4' },
        { name: 'Blush', code: '#DE5D83' },
        { name: 'Maroon', code: '#800000' },
        { name: 'Indigo', code: '#4B0082' },
        { name: 'Frost', code: '#DEE3E0' },
        { name: 'Slate', code: '#708090' },
        { name: 'Lime', code: '#32CD32' },
        { name: 'Seafoam', code: '#71EEB8' },
        { name: 'Cerulean', code: '#007BA7' },
        { name: 'Cotton Candy', code: '#FFBCD9' },
        { name: 'Ruby', code: '#E0115F' },
        { name: 'Plum', code: '#8E4585' }
      ];

      let x = 20;
      let y = 60;
      const colorSize = 12;
      const spacing = 25;

      colors.forEach((color, index) => {
        // Convert hex to RGB
        const rgb = hexToRgb(color.code);
        if (rgb) {
          pdf.setFillColor(rgb.r, rgb.g, rgb.b);
          pdf.rect(x, y, colorSize, colorSize, 'F');
          
          // Add border
          pdf.setDrawColor(0, 0, 0);
          pdf.rect(x, y, colorSize, colorSize, 'S');
        }
        
        // Add color info
        pdf.setFontSize(7);
        pdf.setTextColor(0, 0, 0);
        pdf.text(color.code, x, y + colorSize + 6);
        pdf.text(color.name, x, y + colorSize + 12);
        
        x += spacing * 2;
        if ((index + 1) % 8 === 0) {
          x = 20;
          y += 30;
        }
      });

      // Add footer
      pdf.setFontSize(10);
      pdf.text("Professional Color Analysis • True Winter Palette", 20, y + 20);

      const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="True_Winter_Color_Palette.pdf"');
      res.send(pdfBuffer);
      
    } catch (error) {
      console.error("Error generating palette PDF:", error);
      res.status(500).json({ message: "Failed to generate palette PDF" });
    }
  });

  // Update order email (with order ID in URL)
  app.post("/api/orders/:orderId/update-email", async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const { email } = req.body;
      
      if (!orderId || !email) {
        return res.status(400).json({ message: "Order ID and email are required" });
      }

      const order = await storage.getOrder(parseInt(orderId));
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Update order with email
      await storage.updateOrderEmail(parseInt(orderId), email);
      
      res.json({ success: true, message: "Email stored for order completion" });
      
    } catch (error) {
      console.error("Error updating order email:", error);
      res.status(500).json({ message: "Failed to update email" });
    }
  });

  // Update order email (legacy endpoint)
  app.post("/api/orders/update-email", async (req: Request, res: Response) => {
    try {
      const { paymentIntentId, email } = req.body;
      
      if (!paymentIntentId || !email) {
        return res.status(400).json({ message: "Payment intent ID and email are required" });
      }

      const order = await storage.getOrderByPaymentIntent(paymentIntentId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Update order with email
      await storage.updateOrderEmail(order.id, email);
      
      res.json({ success: true, message: "Email updated successfully" });
      
    } catch (error) {
      console.error("Error updating email:", error);
      res.status(500).json({ message: "Failed to update email" });
    }
  });

  // Email results to user
  app.post("/api/orders/:orderId/email-results", async (req: Request, res: Response) => {
    try {
      const orderIdNum = parseInt(req.params.orderId);
      if (isNaN(orderIdNum)) {
        return res.status(400).json({ message: "Invalid order ID" });
      }
      const order = await storage.getOrder(orderIdNum);
      if (!order || !order.analysisResult) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (!order.email) {
        return res.status(400).json({ message: "No email address found" });
      }

      try {
        await emailService.sendAnalysisReport(order.email, order.analysisResult, order.id.toString());
        await storage.updateOrderEmailSent(order.id);
        res.json({ success: true, message: "Results emailed successfully" });
      } catch (emailError: any) {
        // Handle SendGrid credits exceeded gracefully
        if (emailError.message && emailError.message.includes('Maximum credits exceeded')) {
          console.log(`📧 Email delivery paused due to SendGrid limits. Results accessible at: /results/${order.id}`);
          res.json({ 
            success: true, 
            message: "Analysis complete! Results are available in your dashboard.",
            note: "Email delivery temporarily unavailable"
          });
        } else {
          throw emailError;
        }
      }
      
    } catch (error) {
      console.error("Error emailing results:", error);
      res.status(500).json({ message: "Failed to email results" });
    }
  });

  // Helper function for hex to RGB conversion
  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  // Order lookup endpoint
  app.post("/api/orders/lookup", async (req: Request, res: Response) => {
    try {
      const { email, orderNumber } = req.body;
      
      if (!email || !orderNumber) {
        return res.status(400).json({ message: "Email and order number are required" });
      }

      // Find order by ID and email
      const order = await storage.getOrder(parseInt(orderNumber));
      
      if (!order || order.email !== email) {
        return res.status(404).json({ message: "Order not found with that email and order number" });
      }

      // Return order details
      res.json({
        id: order.id,
        status: order.status,
        paymentStatus: order.paymentStatus,
        analysisResult: order.analysisResult,
        createdAt: order.createdAt,
        email: order.email
      });
      
    } catch (error) {
      console.error("Error looking up order:", error);
      res.status(500).json({ message: "Failed to lookup order" });
    }
  });

  // Pinterest preview endpoint
  app.get("/api/pinterest/preview", async (req: Request, res: Response) => {
    try {
      const { url } = req.query;
      
      if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'URL parameter is required' });
      }

      let finalUrl = url;

      // Handle pin.it short URLs and other Pinterest URL formats
      if (url.includes('pin.it') || url.includes('pinterest.com')) {
        
        // If it's a pin.it short URL, try to resolve it or create a fallback
        if (url.includes('pin.it')) {
          // Extract the ID from pin.it URL
          const pinItMatch = url.match(/pin\.it\/([^\/\?]+)/);
          if (pinItMatch) {
            const pinId = pinItMatch[1];
            // For pin.it URLs, we'll create a generic Pinterest board preview with visual thumbnail
            const previewData = {
              title: 'Pinterest Board',
              description: 'Curated inspiration board with styling ideas perfect for your coloring',
              author_name: 'Hazel & Hue',
              author_url: 'https://pinterest.com/hazelandhue',
              provider_name: 'Pinterest',
              type: 'board',
              url: url,
              thumbnail_url: `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}` // Placeholder visual
            };
            
            return res.json(previewData);
          }
        }

        // Handle full pinterest.com URLs
        const urlPattern = /pinterest\.com\/([^\/]+)\/([^\/]+)?/;
        const match = finalUrl.match(urlPattern);
        
        if (match) {
          const username = match[1];
          const boardName = match[2];
          
          // Clean up board name for display
          const displayBoardName = boardName ? 
            boardName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 
            null;
          
          const previewData = {
            title: displayBoardName ? 
              `${displayBoardName}` : 
              `${username}'s Pinterest Profile`,
            description: displayBoardName ? 
              `Curated inspiration board with ${displayBoardName.toLowerCase()} ideas perfect for your coloring` :
              `Discover pins and boards from ${username}`,
            author_name: username,
            author_url: `https://pinterest.com/${username}`,
            provider_name: 'Pinterest',
            type: boardName ? 'board' : 'profile',
            url: finalUrl,
            thumbnail_url: null // Will be handled by component
          };
          
          return res.json(previewData);
        }

        // Fallback for any Pinterest-related URL
        const previewData = {
          title: 'Pinterest Collection',
          description: 'Curated inspiration with styling ideas perfect for your coloring',
          author_name: 'Pinterest',
          author_url: 'https://pinterest.com',
          provider_name: 'Pinterest',
          type: 'board',
          url: url,
          thumbnail_url: null
        };
        
        return res.json(previewData);
      }

      return res.status(400).json({ error: 'Invalid Pinterest URL format' });

    } catch (error) {
      console.error('Pinterest preview error:', error);
      return res.status(500).json({ error: 'Failed to fetch Pinterest preview' });
    }
  });

  // Promo code validation endpoint
  app.post("/api/promo/validate", async (req: Request, res: Response) => {
    try {
      const { code } = req.body;
      
      if (!code) {
        return res.status(400).json({ message: "Promo code is required" });
      }

      // Get promo code from database
      const promoCode = await storage.getPromoCodeByCode(code.toUpperCase());
      
      if (!promoCode) {
        return res.status(400).json({ 
          valid: false, 
          message: "Invalid promo code" 
        });
      }

      // Check if promo code is active
      if (!promoCode.isActive) {
        return res.status(400).json({ 
          valid: false, 
          message: "This promo code is no longer active" 
        });
      }

      // Check if promo code has expired
      if (promoCode.expiresAt && new Date() > promoCode.expiresAt) {
        return res.status(400).json({ 
          valid: false, 
          message: "This promo code has expired" 
        });
      }

      // Check usage limit
      if (promoCode.usageLimit && (promoCode.usageCount || 0) >= promoCode.usageLimit) {
        return res.status(400).json({ 
          valid: false, 
          message: "This promo code has reached its usage limit" 
        });
      }

      res.json({ 
        valid: true, 
        discount: promoCode.discountPercent,
        discountAmount: promoCode.discountAmount,
        message: `${promoCode.discountPercent}% discount applied!`
      });
      
    } catch (error) {
      console.error("Error validating promo code:", error);
      res.status(500).json({ message: "Failed to validate promo code" });
    }
  });

  // Mark order as free/paid when using 100% discount
  app.post("/api/orders/:orderId/mark-free", async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      
      // Get the order first
      const order = await storage.getOrder(parseInt(orderId));
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      // Update payment status to paid but keep status as processing for analysis
      await storage.updateOrderPaymentStatus(parseInt(orderId), 'paid');
      
      console.log(`🔍 DEBUG - Order ${orderId} status check:`, {
        hasAnalysisResult: !!order.analysisResult,
        currentStatus: order.status,
        paymentStatus: order.paymentStatus,
        hasImages: !!order.images,
        imageCount: Array.isArray(order.images) ? order.images.length : 0
      });

      // FORCE RE-ANALYSIS - Clear existing results and start fresh GPT-o3 analysis
      console.log(`🔄 FORCING FRESH GPT-o3 ANALYSIS for order ${orderId} (ignoring cached results)`);
      
      // Clear any existing analysis data to force fresh analysis
      await storage.updateOrderAnalysis(parseInt(orderId), null, null);
      await storage.updateOrderStatus(parseInt(orderId), 'processing');
      
      console.log(`📁 Order images:`, order.images);
      console.log(`🧠 STARTING FRESH GPT-o3 ANALYSIS for order ${orderId}`);
      
      // Trigger the analysis worker (this will use GPT-o3)
      setImmediate(() => processColorAnalysisWorker(parseInt(orderId)));

      res.json({ success: true, message: "Order marked as paid with promo code" });
      
    } catch (error) {
      console.error("Error marking order as free:", error);
      res.status(500).json({ message: "Failed to process free order" });
    }
  });

  // Mark order as completed after successful Stripe payment
  app.post("/api/orders/:orderId/mark-completed", async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      
      // Get the order and verify it's in analyzed status
      const order = await storage.getOrder(parseInt(orderId));
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      if (order.status !== 'analyzed') {
        return res.status(400).json({ message: "Order must be analyzed before completion" });
      }
      
      // Update payment status and set to completed
      await storage.updateOrderPaymentStatus(parseInt(orderId), 'paid');
      await storage.updateOrderStatus(parseInt(orderId), 'completed');

      // Get the updated order with analysis results
      const updatedOrder = await storage.getOrder(parseInt(orderId));
      
      if (updatedOrder && updatedOrder.email && updatedOrder.analysisResult) {
        try {
          // Send email with results
          await emailService.sendAnalysisReport(updatedOrder.email, updatedOrder.analysisResult, updatedOrder.id.toString());
          await storage.updateOrderEmailSent(updatedOrder.id);
          console.log(`Analysis results emailed to: ${updatedOrder.email}`);
        } catch (emailError) {
          console.error("Error sending analysis email:", emailError);
          // Don't fail the request if email fails
        }
      }

      res.json({ success: true, message: "Order completed successfully" });
      
    } catch (error) {
      console.error("Error completing order:", error);
      res.status(500).json({ message: "Failed to complete order" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Color analysis processing function

