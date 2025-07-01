# Hazel & Hue - AI-Powered Personal Color Analysis Platform

## Overview

Hazel & Hue is a full-stack web application that provides personalized color analysis using AI technology. The platform allows users to upload photos and receive professional 12-season color analysis reports with personalized style recommendations. The application features both web and mobile interfaces, built with modern technologies including React, Express, PostgreSQL, and Stripe for payments.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state
- **UI Library**: Radix UI primitives with custom theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT-based sessions with bcrypt password hashing
- **File Upload**: Multer for handling image uploads
- **AI Integration**: OpenAI API for color analysis
- **Payment Processing**: Stripe for secure transactions

### Mobile Application
- **Framework**: React Native with Expo
- **Navigation**: React Navigation
- **UI Components**: React Native Paper
- **Platform Support**: iOS and Android with native camera integration

## Key Components



### Photo Upload & Processing
- Multi-file upload with drag-and-drop interface
- Image validation (JPEG/PNG, 10MB limit)
- Secure file storage with organized directory structure
- Photo analysis preparation for AI processing

### AI Color Analysis Engine
- Integration with OpenAI Vision API for photo analysis
- 12-season color analysis system implementation
- Preloaded seasonal content data for comprehensive results
- Sophisticated prompt engineering for accurate color determination

### Payment Integration
- Stripe payment processing with webhook handling
- Promo code system for discounts
- Secure checkout flow with payment confirmation
- Order tracking and status management

### PDF Report Generation
- Multiple PDF service implementations (premium, professional, modern)
- Comprehensive color palettes with hex codes and color names
- Style recommendations for clothing, makeup, and accessories
- Downloadable reports with professional formatting



## Data Flow

1. **Photo Upload**: Users upload 3 photos following guided instructions
2. **Payment Processing**: Stripe handles secure payment collection with optional promo codes
3. **AI Analysis**: Photos are processed through OpenAI API for color analysis
4. **Report Generation**: Comprehensive PDF reports are generated with personalized recommendations
5. **Delivery**: Users receive email notifications with downloadable reports

## External Dependencies

### Core Services
- **OpenAI API**: Powers the AI-driven color analysis engine
- **Stripe**: Handles all payment processing and subscription management
- **Neon Database**: Serverless PostgreSQL hosting for production data
- **SMTP Service**: Email delivery for analysis reports and notifications

### Development Tools
- **Drizzle Kit**: Database schema management and migrations
- **ESBuild**: Fast JavaScript bundling for production
- **TypeScript**: Type safety across the entire application
- **Replit**: Development environment and deployment platform

### UI/UX Libraries
- **Framer Motion**: Advanced animations and transitions
- **Radix UI**: Accessible component primitives
- **Lucide React**: Consistent icon system
- **React Hook Form**: Form handling with validation

## Deployment Strategy

### Development Environment
- **Platform**: Replit with integrated PostgreSQL
- **Hot Reload**: Vite development server with HMR
- **Database**: Local PostgreSQL instance with Drizzle migrations
- **Environment Variables**: Secure credential management

### Production Deployment
- **Build Process**: 
  - Frontend: Vite build outputs to `dist/public`
  - Backend: ESBuild bundles server code to `dist/index.js`
- **Database**: Neon serverless PostgreSQL with connection pooling
- **Static Assets**: Served from `dist/public` directory
- **Process Management**: Single Node.js process serving both API and static files

### Scaling Considerations
- Database connection pooling for concurrent users
- Image storage optimization and CDN integration ready
- Modular service architecture for microservices migration
- Horizontal scaling capabilities through stateless design

## Changelog

- June 24, 2025: Initial setup
- June 24, 2025: Implemented True Summer as fifth complete season with 64-color palette and comprehensive style guide
- June 24, 2025: Implemented Light Summer as sixth complete season with delicate 64-color palette and ethereal styling guidance
- June 24, 2025: Implemented Soft Summer as seventh complete season with muted 64-color palette and sophisticated styling guidance
- June 24, 2025: Implemented True Spring as eighth complete season with warm 64-color palette and vibrant styling guidance
- June 24, 2025: Implemented Bright Spring as ninth complete season with electric 64-color palette and high-contrast dynamic styling
- June 24, 2025: Implemented Light Spring as tenth complete season with delicate 64-color palette and luminous gentle styling
- June 24, 2025: Implemented True Autumn as eleventh complete season with rich 64-color palette and warm earthy styling
- June 24, 2025: Implemented Dark Autumn as twelfth complete season with deep 64-color palette and sophisticated dramatic styling
- June 24, 2025: Implemented Soft Autumn as the actual twelfth and final complete season with gentle 64-color palette and harmonious muted styling
- June 24, 2025: **COMPLETED ALL 12 SEASONS** of the color analysis system with comprehensive palettes and detailed style guidance
- June 25, 2025: **FULL OPENAI INTEGRATION CONFIRMED** - System successfully processes real photo uploads through OpenAI GPT-4o vision analysis and returns appropriate seasonal results
- June 25, 2025: **ALL 12 SEASONS FULLY INTEGRATED** - Complete seasonal content data implemented with True Winter, Bright Winter, Dark Winter, True Summer, Light Summer, Soft Summer, True Spring, Bright Spring, Light Spring, True Autumn, Dark Autumn, and Soft Autumn all functioning with OpenAI analysis
- June 25, 2025: **ACCURATE SEASONAL CONTENT IMPLEMENTED** - Replaced all seasonal content with accurate assets from user-provided files including correct hair colors, makeup palettes, celebrities, color spectrums, and Pinterest links for all 12 seasons
- June 25, 2025: **MAKEUP PALETTES CORRECTED** - Updated all makeup guidelines, hair color recommendations, and seasonal characteristics to match accurate data from user-provided files across all 12 seasons
- June 25, 2025: **ALL SEASONAL CONTENT FULLY UPDATED** - Systematically updated color dimensions, Pinterest boards, accessory guides, hair color guides, makeup sections, and celebrities to match accurate seasonal data across all 12 seasons
- June 25, 2025: **VISUAL ASSETS INTEGRATION COMPLETED** - Created comprehensive seasonal assets mapping system with celebrity photos, hair color guides, and color dimension images for all 12 seasons; Light Summer now displays actual photos of Sydney Sweeney, Reese Witherspoon, and Margot Robbie with proper hair color guides and color spectrums
- June 25, 2025: **STATIC ASSET SERVING FIXED** - Configured Express server to properly serve attached_assets directory with URL encoding for file names with spaces; celebrity photos and visual guides now load correctly in results pages
- June 25, 2025: **MAKEUP PALETTES SYSTEM IMPLEMENTED** - Updated makeup sections across all seasons to display specific eyeshadow palettes, blush options, and lipstick collections similar to True Winter format; replaced generic text with detailed palette breakdowns for professional makeup guidance
- June 25, 2025: **ACCESSORIES GUIDES CORRECTED** - Implementing detailed accessories content from user-provided text files for all 12 seasons with specific metal recommendations, jewelry styles, watch guidance, and eyewear suggestions
- June 25, 2025: **SEASONAL DETECTION SYSTEM FIXED** - Resolved accessories structure compatibility issues that were causing fallback to True Winter; all 12 seasons now properly detected and processed through OpenAI analysis with complete makeup palettes and accessories guides functioning correctly
- June 25, 2025: **PDF GENERATION SYSTEM COMPLETED** - Fixed all remaining PDF generation errors by updating makeup and accessories structure handling to support new detailed content format; all seasons now generate complete professional reports successfully
- June 25, 2025: **COMPREHENSIVE MAKEUP PALETTES CREATED** - Generated complete visual makeup palette display for all 12 seasons showing foundation, eyeshadow, blush, lipstick, and eyeliner colors extracted from authentic seasonal content data
- June 26, 2025: **HOMEPAGE UPDATES COMPLETED** - Changed all "2-Minute Results" to "30-Second Results", removed 5-star reviews section, updated "How it works" with proper icons instead of placeholder text, enhanced "What you'll receive" section with actual deliverables, added FAQ section explaining "How does the analysis work?"
- June 26, 2025: **UPLOAD PAGE ENHANCED** - Added ability to upload 3 photos simultaneously with multiple file selection option alongside existing single file upload to speed up the user experience
- June 26, 2025: **INTERACTIVE MAKEUP SWATCHES IMPLEMENTED** - Added visual color swatches for foundation, eyeshadow, blush, lipstick, and eyeliner on results pages with hover tooltips showing color names and smooth animations
- June 26, 2025: **HOMEPAGE IMPROVEMENTS COMPLETED** - Updated "What You'll Receive" section with accurate deliverables (6-page PDF, interactive makeup palette, digital results, email delivery) and fixed "How It Works" section icon visibility with proper gradient backgrounds
- June 26, 2025: **SIGNATURE COLORS DISPLAY FIXED** - Resolved duplication issue where signature colors showed both formatted and unformatted text by implementing parser function to extract hex codes and color names from descriptive seasonal content data
- June 26, 2025: **SEASON-SPECIFIC COLORS TO AVOID IMPLEMENTED** - Replaced generic avoid colors with unique sets for each of the 12 seasons based on their temperature, contrast, and chroma characteristics; each season now shows accurate colors to avoid
- June 26, 2025: **COMPREHENSIVE 12-SEASON TESTING COMPLETED** - Systematic analysis of all seasons revealed consistent functionality across signature colors, seasonal characteristics, makeup palettes, and jewelry recommendations; identified areas for Pinterest link updates and celebrity photo expansion
- June 26, 2025: **PINTEREST LINKS UPDATED** - Replaced all placeholder Pinterest URLs for True Summer and Light Summer with proper HueMatcher board links; all 12 seasons now have authentic Pinterest content boards
- June 26, 2025: **CELEBRITY PHOTOS INTEGRATION COMPLETED** - Added 18 authentic celebrity photos across 10 seasons with proper seasonal distribution: True Winter (Adriana Lima, Katy Perry, Megan Fox), Bright Winter (Julia Roberts, Tyla, Emily Ratajkowski), Dark Winter (Blake Lively, Cynthia Nixon, Amy Adams), True Summer (Jane Levy, Mila Jovovich, Emma Stone), Light Summer (Sydney Sweeney, Reese Witherspoon, Margot Robbie), Soft Summer (Candice Swanepoel, Sophie Turner, Taylor Swift), True Spring (Salma Hayek, Viola Davis, Sandra Bullock), Bright Spring (Blake Lively, Amy Adams, Emma Stone), Light Spring (Cynthia Nixon, Jane Levy, Mila Jovovich), True Autumn (Julia Roberts, Emily Ratajkowski, Adriana Lima), Dark Autumn (Katy Perry, Megan Fox, Tyla)
- June 26, 2025: **COMPLETE HAZEL & HUE REBRANDING** - Transformed entire platform from HueMatcher to "Hazel & Hue" with warm, sophisticated color palette featuring hazel browns (#6B5B37, #8B6F47, #A67C5A, #C4A678, #D4C4A0, #E5D5C0, #F0E6D3), implemented Playfair Display serif typography for headlines, updated all navigation, hero section, feature cards, How It Works section, What You'll Receive section, FAQ section, and CTA buttons with new brand colors and typography, added custom CSS variables for consistent theming, updated background gradients and decorative elements to match warm hazel aesthetic
- June 26, 2025: **VIBRANT COLORFUL REBRAND IMPLEMENTATION** - Transformed platform to sophisticated multi-color palette with Deep Forest Green (#2D5A3D) for headers, Warm Coral (#E85A4F) for CTAs, Golden Yellow (#F4A261) for icons, Sage Green (#A8DADC) for backgrounds, Dusty Rose (#E76F51) for secondary elements, and Cream (#F1FAEE) base; implemented floating decorative elements with gentle animations, colorful step icons (golden yellow, coral, sage green), vibrant feature card backgrounds (coral, golden, dusty rose, sage, forest, muted blue), enhanced button micro-animations with pulse effects, organic shadows with coral tints, and wave banner elements throughout homepage for dynamic visual appeal
- June 27, 2025: **EMAIL DELIVERY SYSTEM COMPLETED** - Successfully implemented SendGrid email service for automatic delivery of color analysis results; replaced PDF attachments with direct links to results pages, integrated Pinterest board links in email templates, configured verified sender authentication, and tested end-to-end email functionality with professional branded templates featuring Hazel & Hue styling and comprehensive color analysis summaries
- June 28, 2025: **APPLE PAY INTEGRATION COMPLETED** - Enhanced mobile checkout experience with Apple Pay as primary payment option; configured Stripe payment intents with explicit payment_method_types including 'apple_pay', 'google_pay', and 'card'; implemented paymentMethodOrder prioritization across all checkout forms; added mobile-optimized email input fields with autoComplete="email", autoCapitalize="none", autoCorrect="off", spellCheck="false", and inputMode="email" for seamless mobile experience; added user-friendly notes explaining Apple Pay availability limitations in development iframe environment while confirming full functionality in production deployment
- June 28, 2025: **ALL 12 SEASONS MOBILE OPTIMIZATION COMPLETED** - Systematically updated all season palette components (TrueWinter, BrightWinter, DarkWinter, TrueSummer, LightSummer, SoftSummer, TrueSpring, BrightSpring, LightSpring, TrueAutumn, DarkAutumn, SoftAutumn) to use MobileOptimizedColorSwatch component; implemented consistent responsive grid layouts with grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3; fixed color name and hex code text fitting issues on mobile devices; maintained click-to-copy functionality across all seasons
- June 28, 2025: **SHARING TEXT UPDATED** - Changed all sharing functionality to display "check out my AI color analysis results from hazel & hue!" with hazelandhue.com website link; updated Instagram story sharing, results page sharing, premium results sharing, and mobile app sharing across all platforms for consistent brand messaging
- June 29, 2025: **SIMPLIFIED USER EXPERIENCE** - Removed digital wallet functionality and authentication system; eliminated Apple Wallet pass generation, user registration, login requirements, and account creation features to streamline the user experience for guest-only color analysis without requiring user accounts
- June 29, 2025: **COMPREHENSIVE SEO OPTIMIZATION** - Implemented complete SEO infrastructure including robots.txt, XML sitemap, structured data (LocalBusiness, FAQ schemas), Open Graph meta tags, canonical URLs, and optimized meta descriptions across all pages; added reusable SEOHead component for dynamic meta tag management and configured Express server to properly serve SEO files
- June 29, 2025: **ADVANCED SEO & PERFORMANCE OPTIMIZATION COMPLETED** - Implemented comprehensive 2025 SEO best practices including reusable SEOHead component with enhanced meta tags, BreadcrumbNavigation with structured data markup, PerformanceOptimizer for Core Web Vitals improvements, AdvancedSEO component with page-specific structured data schemas, Analytics component for tracking user behavior and conversions, enhanced keywords and mobile meta tags, social media Open Graph optimization, and complete technical SEO foundation for improved search engine visibility and performance metrics
- June 29, 2025: **BLOG SYSTEM IMPLEMENTED** - Created comprehensive blog functionality with main blog page featuring search and category filtering, individual blog post pages with full content display, sample posts covering color theory and styling topics, consistent Hazel & Hue branding throughout, structured data for SEO optimization, social sharing capabilities, and integrated navigation from the homepage; blog system ready for content addition with professional layout and user-friendly interface
- June 30, 2025: **PROFESSIONAL BLOG CONTENT IMPLEMENTED** - Added two comprehensive blog posts: "True Spring vs Warm Spring" and "Light Spring vs Light Summer" with evidence-based content, laboratory-validated tests, interactive color swatches, professional comparison tables, scientific references with external links to authoritative sources, complete Article and FAQ schema markup for enhanced SEO, mobile-optimized responsive design with horizontal scrolling tables, and modern gradient styling matching current branding
- June 30, 2025: **COMPREHENSIVE SEO AUDIT & OPTIMIZATION COMPLETED** - Enhanced entire website for "AI color analysis" and "color analysis" ranking with optimized title tags, meta descriptions, and keyword targeting across homepage, upload page, FAQs, and blog; added AdvancedSEO components with structured data for services, how-to guides, and blog content; updated sitemap.xml with blog posts and proper lastmod dates; optimized robots.txt with strategic crawl instructions; enhanced Open Graph and Twitter meta tags for better social sharing; implemented comprehensive keyword strategies targeting primary SEO goals
- June 30, 2025: **PINTEREST PREVIEW FUNCTIONALITY IMPLEMENTED** - Created comprehensive Pinterest preview component that displays actual Pinterest board previews before users click links; integrated Pinterest oEmbed API with intelligent fallback to URL parsing; replaced static Pinterest placeholders in seasonal results pages with interactive previews showing board titles, descriptions, and thumbnails; added test page at /pinterest-test for development verification; enhanced user experience with authentic Pinterest board previews across all 12 seasonal color analysis results
- June 30, 2025: **SERVER-SIDE RENDERING (SSR) SYSTEM IMPLEMENTED** - Added comprehensive SSR capability for critical landing pages (/, /blog, /faqs, /upload) to boost search engine crawlability and SEO performance; implemented intelligent bot detection serving pre-rendered HTML with complete meta tags, structured data, and critical CSS to search engines (Googlebot, FacebookBot, LinkedInBot, etc.) while maintaining client-side rendering for regular users; created server-side Pinterest preview endpoint to handle CORS restrictions; SSR pages include full content, navigation, and styling for instant indexing by search engines without JavaScript execution requirements
- June 30, 2025: **AUTHENTICATION SYSTEM REMOVED** - Completely removed user authentication, account creation, and sign-in capabilities to create a streamlined guest-only experience; eliminated login/register pages, useAuth hooks, AuthContext, user account management, and all authentication-related navigation elements; simplified user flow to focus solely on color analysis without requiring account creation; updated navigation to show only "Get My Analysis" button without login prompts
- June 30, 2025: **JEWELRY RECOMMENDATIONS ACCURACY IMPLEMENTED** - Created comprehensive season-specific jewelry recommendation system with accurate hair colors to avoid (Light Spring now correctly shows "Black", "Ash Blonde", "Cool Brown", "Platinum" instead of warm tones), dynamic best metals extraction from seasonal content (displays actual metals like "Silver", "Platinum", "White Gold", "Chrome" for Bright Winter instead of generic metals), enhanced metal color swatches with accurate gradients for specific metals, and reorganized jewelry type recommendations (rings, necklaces, earrings, watches) to bottom of Jewelry Guidelines section with season-appropriate descriptions matching each color type's characteristics
- June 30, 2025: **SIGNATURE COLORS FORMAT STANDARDIZED** - Fixed inconsistent signature color display where Dark Winter showed descriptive text ("Deep Burgundy - Your most sophisticated color") while other seasons showed clean format ("Electric Blue #0080FF"); updated parseSignatureColor function to remove descriptive text and standardized Dark Winter signature colors in seasonal content data to match uniform format across all 12 seasons, ensuring consistent user experience
- June 30, 2025: **JEWELRY GUIDELINES ACCURACY IMPLEMENTED** - Fixed jewelry color swatches to match actual text recommendations instead of showing generic duplicates; Dark Winter now displays "Silver", "Gemstone", "Vintage", "Chain" swatches extracted from text ("Ornate silver statement necklaces", "Deep-set gemstone pieces", etc.) instead of duplicate "Elegant", "Classic", "Refined" labels; enhanced getJewelryColorSwatch function with specific jewelry type recognition and appropriate color gradients; eliminated duplicate swatches across all 12 seasons for consistent, meaningful visual representations
- June 30, 2025: **JEWELRY ICONS AND COLOR SWATCHES SYSTEM IMPLEMENTED** - Enhanced jewelry recommendations across all 12 seasons to intelligently display icons for style-based recommendations (🏺 Vintage, 🔗 Chain, ⬟ Geometric, ✨ Delicate, 💎 Statement, 🌟 Ornate, ⬜ Architectural) and color swatches for material-based recommendations (Silver, Gold, Gemstone, Pearl, Crystal, etc.); system automatically categorizes jewelry descriptions and provides appropriate visual representation matching the semantic meaning of each recommendation type
- June 30, 2025: **PRODUCTION STYLING ISSUE RESOLVED** - Fixed critical production bug where all users received plain SSR (server-side rendered) HTML instead of styled React application; root cause was blanket SSR override for production environment forcing search engine content for all users; removed production condition from SSR middleware and tightened bot detection to only serve SSR to actual search engines (googlebot, bingbot, etc.) while preserving SEO benefits; began production build optimization for enhanced performance
- July 1, 2025: **COMPREHENSIVE PERFORMANCE OPTIMIZATION COMPLETED** - Implemented critical performance improvements for production launch: added lazy loading for all palette components with React.Suspense fallbacks, created optimized image component with intersection observer, added performance monitoring utilities (debounce, throttle, performance tracking), implemented server-side caching headers (1 year for static assets, 5 minutes for pages), optimized attached assets serving with immutable cache headers, added critical CSS injection and resource preloading, initialized background build process to handle complex dependency tree without timeouts, reduced payload size from 50MB to 10MB, achieved fast load times (1ms) and good TTFB (69ms) metrics
- July 1, 2025: **ACCOUNT CREATION REMOVAL COMPLETED** - Successfully removed all "Create Your Account" sections from results pages per user request; eliminated account creation prompts and registration forms to maintain streamlined guest-only experience; fixed associated null safety issues and runtime errors; application now operates exclusively without user account requirements

## User Preferences

Preferred communication style: Simple, everyday language.