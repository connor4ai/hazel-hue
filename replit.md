# HueMatcher - AI-Powered Personal Color Analysis Platform

## Overview

HueMatcher is a full-stack web application that provides personalized color analysis using AI technology. The platform allows users to upload photos and receive professional 12-season color analysis reports with personalized style recommendations. The application features both web and mobile interfaces, built with modern technologies including React, Express, PostgreSQL, and Stripe for payments.

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

### Authentication System
- User registration and login with encrypted passwords
- Session-based authentication using JWT tokens
- Protected routes for authenticated users
- Account management with order history

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

### Wallet Pass Integration
- Apple Wallet pass generation for color cards
- Portable color reference for shopping
- JSON-based pass data with manifest generation

## Data Flow

1. **User Registration/Login**: Users create accounts or authenticate to access services
2. **Photo Upload**: Users upload 3 photos following guided instructions
3. **Payment Processing**: Stripe handles secure payment collection with optional promo codes
4. **AI Analysis**: Photos are processed through OpenAI API for color analysis
5. **Report Generation**: Comprehensive PDF reports are generated with personalized recommendations
6. **Delivery**: Users receive email notifications with downloadable reports and wallet passes

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

## User Preferences

Preferred communication style: Simple, everyday language.