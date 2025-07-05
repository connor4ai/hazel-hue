import fs from 'fs';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function testWorkingAnalysis() {
  try {
    console.log('🎨 Testing working color analysis approach...');
    
    const imagePath = 'attached_assets/Screenshot 2025-07-04 at 7.10.27 PM_1751732656484.png';
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    
    console.log('🚀 Starting GPT-4o color analysis...');
    const startTime = Date.now();
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0,
      top_p: 0,
      seed: 12345,
      messages: [
        {
          role: "system",
          content: "You are an expert color analyst. Analyze the color harmony and seasonal color type visible in this image. Focus on color analysis rather than identifying individuals."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Based on the color palette visible in this image - the hair tones, skin warmth, and overall color harmony - determine the seasonal color type using the 12-season system. Focus on the color relationships and temperature. Respond with just the season name."
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
    
    console.log(`⏱️ Analysis completed in ${duration} seconds`);
    console.log(`🎯 Season determined: ${season}`);
    
    return { season, duration };
    
  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
    throw error;
  }
}

testWorkingAnalysis().then(result => {
  console.log('✅ Final Result:', result);
}).catch(console.error);