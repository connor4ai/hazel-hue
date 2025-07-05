import fs from 'fs';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function testDirectGPTo3Analysis() {
  try {
    console.log('🧠 Testing direct GPT-o3 visual analysis...');
    
    const imagePath = 'attached_assets/Screenshot 2025-07-04 at 7.10.27 PM_1751732656484.png';
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    
    console.log('🚀 Starting GPT-o3 analysis...');
    const startTime = Date.now();
    
    const response = await openai.chat.completions.create({
      model: "o3", // GPT-o3 full model
      temperature: 0,
      top_p: 0,
      seed: 12345,
      max_completion_tokens: 32768,
      messages: [
        {
          role: "system",
          content: "You are a certified professional color analyst. Analyze this person's coloring using the 12-season color analysis system. Look at their natural skin tone, hair color, and eye color to determine their season. Respond with just the season name (e.g., 'True Autumn', 'Light Spring', etc.)."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "What season is this person? Use the 12-season color analysis system."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${base64Image}`
              }
            }
          ]
        }
      ]
    });
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    const season = response.choices[0].message.content.trim();
    
    console.log(`⏱️ GPT-o3 analysis completed in ${duration} seconds`);
    console.log(`🎯 Season determined: ${season}`);
    
    return { season, duration };
    
  } catch (error) {
    console.error('❌ GPT-o3 analysis failed:', error.message);
    
    // Fallback to GPT-4o
    console.log('🔄 Falling back to GPT-4o...');
    try {
      const imagePath = 'attached_assets/Screenshot 2025-07-04 at 7.10.27 PM_1751732656484.png';
      const imageBuffer = fs.readFileSync(imagePath);
      const base64Image = imageBuffer.toString('base64');
      
      const startTime = Date.now();
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        temperature: 0,
        top_p: 0,
        seed: 12345,
        messages: [
          {
            role: "system",
            content: "You are a certified professional color analyst. Analyze this person's coloring using the 12-season color analysis system."
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "What season is this person? Use the 12-season color analysis system."
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/png;base64,${base64Image}`
                }
              }
            ]
          }
        ]
      });
      
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;
      
      const season = response.choices[0].message.content.trim();
      
      console.log(`⏱️ GPT-4o fallback completed in ${duration} seconds`);
      console.log(`🎯 Season determined: ${season}`);
      
      return { season, duration, usedFallback: true };
      
    } catch (fallbackError) {
      console.error('❌ Fallback also failed:', fallbackError.message);
      throw fallbackError;
    }
  }
}

testDirectGPTo3Analysis().catch(console.error);