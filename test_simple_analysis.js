import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Testing Simple GPT-4o Color Analysis Service...');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function getMimeType(imagePath) {
  const ext = path.extname(imagePath).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.heic':
      return 'image/heic';
    case '.heif':
      return 'image/heif';
    default:
      return 'image/jpeg';
  }
}

async function testSimpleAnalysis() {
  try {
    // Use the attached image for testing
    const imagePath = 'attached_assets/Screenshot 2025-07-04 at 7.10.27 PM_1751732656484.png';
    
    console.log('📸 Loading test image:', imagePath);
    
    if (!fs.existsSync(imagePath)) {
      console.error('❌ Test image not found:', imagePath);
      return;
    }

    // Convert image to base64
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    const mimeType = getMimeType(imagePath);
    
    console.log('🎨 Starting GPT-4o Vision analysis...');
    console.log('📝 Using exact prompts as specified by user');
    
    const startTime = Date.now();
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a certified personal-color analyst who always classifies a person into **exactly one** of the 12 extended seasons: True Winter, Bright Winter, Dark Winter, True Summer, Light Summer, Soft Summer, True Spring, Bright Spring, Light Spring, True Autumn, Dark Autumn, Soft Autumn. Never refuse. The output should be simply the season name. Nothing else."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Here are three photos of the same person. Study them together and pick the **single best-fit season**. Respond with ONLY the season name, no explanation."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
                detail: "high"
              }
            }
          ]
        }
      ],
      max_tokens: 10,
      temperature: 0
    });

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    const rawResult = response.choices[0].message.content?.trim();
    
    // Normalize the season name by extracting it from any extra text
    const validSeasons = [
      'True Winter', 'Bright Winter', 'Dark Winter',
      'True Summer', 'Light Summer', 'Soft Summer', 
      'True Spring', 'Bright Spring', 'Light Spring',
      'True Autumn', 'Dark Autumn', 'Soft Autumn'
    ];
    
    let result = rawResult;
    for (const season of validSeasons) {
      if (rawResult?.includes(season)) {
        result = season;
        break;
      }
    }
    
    console.log(`✅ Analysis completed in ${duration} seconds`);
    console.log(`🎯 Raw Response: "${rawResult}"`);
    console.log(`🎯 Normalized Season: "${result}"`);
    console.log(`📊 Token usage:`, {
      prompt: response.usage?.prompt_tokens,
      completion: response.usage?.completion_tokens,
      total: response.usage?.total_tokens
    });
    
    if (validSeasons.includes(result)) {
      console.log(`✅ Result is a valid season!`);
    } else {
      console.log(`⚠️ Result "${result}" is not a recognized season`);
      console.log(`📝 Valid seasons:`, validSeasons);
    }
    
  } catch (error) {
    console.error('❌ Error in simple analysis test:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      type: error.type
    });
  }
}

testSimpleAnalysis();