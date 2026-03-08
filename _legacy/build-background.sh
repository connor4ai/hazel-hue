#!/bin/bash

# Background build script for production optimization
echo "🚀 Starting background production build..."

# Create a lock file to prevent multiple builds
LOCK_FILE="/tmp/build.lock"
if [ -f "$LOCK_FILE" ]; then
    echo "Build already in progress, exiting..."
    exit 0
fi

touch "$LOCK_FILE"

# Cleanup function
cleanup() {
    rm -f "$LOCK_FILE"
    echo "Build cleanup completed"
}
trap cleanup EXIT

# Set environment
export NODE_ENV=production

# Build frontend with chunking for faster builds
echo "📦 Building frontend..."
npx vite build \
  --target=es2020 \
  --outDir=dist/public \
  --emptyOutDir \
  --minify=esbuild \
  --sourcemap=false \
  --chunkSizeWarningLimit=1000 \
  --mode=production &

BUILD_PID=$!

# Build server separately  
echo "🔧 Building server..."
npx esbuild server/index.ts \
  --platform=node \
  --packages=external \
  --bundle \
  --format=esm \
  --outdir=dist \
  --minify &

SERVER_PID=$!

# Wait for both builds with timeout
echo "⏳ Waiting for builds to complete..."
timeout 300 bash -c "wait $BUILD_PID && wait $SERVER_PID" 

if [ $? -eq 0 ]; then
    echo "✅ Background build completed successfully!"
    
    # Verify build output
    if [ -d "dist/public" ] && [ -f "dist/index.js" ]; then
        echo "📁 Build artifacts verified"
        ls -la dist/public/ | head -10
    else
        echo "⚠️ Build verification failed"
    fi
    
    # Optional: Send signal to restart server with new build
    # pkill -USR1 -f "server/index.ts" 2>/dev/null || true
    
else
    echo "❌ Build timed out or failed"
    kill $BUILD_PID $SERVER_PID 2>/dev/null || true
fi

echo "Background build script completed"