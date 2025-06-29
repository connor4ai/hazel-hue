#!/bin/bash

# Hazel & Hue Deployment Script
echo "🎨 Deploying Hazel & Hue Color Analysis Platform"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js version 20+ required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Build the application
echo "🏗️  Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo "✅ Build completed successfully"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating template..."
    cat > .env << 'EOF'
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# APIs
OPENAI_API_KEY=sk-your-openai-key
STRIPE_SECRET_KEY=sk_live_your-stripe-secret
STRIPE_PUBLISHABLE_KEY=pk_live_your-stripe-publishable
SENDGRID_API_KEY=SG.your-sendgrid-key

# Email
FROM_EMAIL=noreply@yourdomain.com

# App
NODE_ENV=production
PORT=5000
EOF
    echo "📝 Please update the .env file with your actual values before starting the server."
fi

# Create uploads directory if it doesn't exist
mkdir -p uploads

echo "🚀 Deployment ready!"
echo ""
echo "Next steps:"
echo "1. Update .env file with your configuration"
echo "2. Set up your PostgreSQL database"
echo "3. Run: npm start"
echo ""
echo "For detailed deployment instructions, see DEPLOYMENT_GUIDE.md"