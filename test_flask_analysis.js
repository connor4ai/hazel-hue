// Test Flask analysis system
import fs from 'fs';
import { spawn } from 'child_process';

async function testFlaskAnalysis() {
  console.log('🧪 Testing Flask analysis with Cynthia Nixon image...');
  
  try {
    // Test image paths from order 473
    const imagePaths = [
      './uploads/images/473-1751746198915-1.jpg',
      './uploads/images/473-1751746198916-2.jpg',
      './uploads/images/473-1751746198916-3.jpg'
    ];
    
    // Check if files exist
    for (const path of imagePaths) {
      if (!fs.existsSync(path)) {
        console.log(`❌ Image not found: ${path}`);
        return;
      }
    }
    
    console.log('✅ All test images found');
    
    // Test Flask analysis via Python
    const pythonCode = `
import os, sys, base64, json
sys.path.append('python')
import server

# Test the analysis directly
try:
    # Load test images
    imagePaths = ${JSON.stringify(imagePaths)}
    
    # Convert to base64
    b64_images = []
    for path in imagePaths:
        with open(path, 'rb') as f:
            b64_images.append(base64.b64encode(f.read()).decode())
    
    print(f"📸 Loaded {len(b64_images)} images")
    
    # Run Flask analysis
    result = server.call_gpt(b64_images)
    print(f"🎯 Analysis result: {json.dumps(result, indent=2)}")
    
except Exception as e:
    print(f"❌ Analysis failed: {e}")
    import traceback
    traceback.print_exc()
`;
    
    console.log('🔬 Running Flask analysis...');
    
    const python = spawn('python', ['-c', pythonCode], {
      env: { ...process.env, PYTHONPATH: '.' },
      cwd: process.cwd()
    });
    
    python.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    
    python.stderr.on('data', (data) => {
      console.error('Python error:', data.toString());
    });
    
    python.on('close', (code) => {
      console.log(`🏁 Flask analysis test completed with code: ${code}`);
    });
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testFlaskAnalysis();