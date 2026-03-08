#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 Starting optimized production build...');

// Create optimized build with specific settings
const buildCommand = `
NODE_ENV=production npx vite build \
  --target=es2020 \
  --outDir=dist/public \
  --emptyOutDir \
  --minify=esbuild \
  --sourcemap=false \
  --mode=production
`;

try {
  console.log('📦 Building frontend assets...');
  execSync(buildCommand, { stdio: 'inherit', timeout: 120000 }); // 2 min timeout
  
  console.log('🔧 Building server...');
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
  
  // Verify build output
  const distPath = path.join(__dirname, 'dist/public');
  if (fs.existsSync(distPath)) {
    const files = fs.readdirSync(distPath);
    console.log(`📁 Generated ${files.length} files in dist/public`);
    
    const hasAssets = files.some(file => file.endsWith('.css') || file.endsWith('.js'));
    if (hasAssets) {
      console.log('✅ CSS and JS assets generated successfully');
    } else {
      console.warn('⚠️  Warning: No CSS/JS assets found in build output');
    }
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}