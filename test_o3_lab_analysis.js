import OpenAI from 'openai';

async function testO3LabAnalysis() {
  console.log('🧪 Testing GPT-o3 LAB analysis with fixed parameters...');
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  // Sample LAB data from Order 465
  const labData = {
    "skin_LAB": [62.49, 13.03, 17.34],
    "hair_LAB": [85.10, 2.70, 3.27],
    "eye_LAB": [33.14, 6.51, 12.80],
    "overall_contrast": "medium",
    "undertone": "warm",
    "chroma_intensity": "vibrant"
  };
  
  try {
    console.log('📡 Making GPT-o3 LAB analysis call...');
    
    const response = await openai.chat.completions.create({
      model: "o3",
      max_completion_tokens: 32768,
      messages: [
        {
          role: "system",
          content: "You are a certified color analyst specializing in the 12-season system. Use your advanced reasoning capabilities to analyze the provided LAB color data to determine the correct seasonal color type."
        },
        {
          role: "user", 
          content: `Using the 12-season color analysis system, classify this person based on their LAB color data:

${JSON.stringify(labData, null, 2)}

Consider:
- Skin LAB values for undertone assessment (a* values: negative=green/cool, positive=red/warm)
- Hair LAB values for natural coloring (L* for lightness, a* and b* for undertone)
- Eye LAB values for contrast analysis (how they contrast with skin and hair)
- Overall contrast level (high/medium/low)
- Undertone (warm/cool/neutral)
- Chroma intensity (muted/moderate/vibrant)

Use your reasoning to carefully analyze these numerical values and classify the season.

Return exactly this JSON:
{
  "season": "<Exact season name>",
  "confidence": <0-100 integer>,
  "reasoning": "<Detailed explanation based on LAB values analysis>"
}`
        }
      ]
    });
    
    console.log('✅ GPT-o3 LAB Analysis Response:');
    console.log('Raw content:', response.choices[0].message.content);
    console.log('📊 Usage:', response.usage);
    console.log('🏷️ Model:', response.model);
    
    // Try to parse JSON
    try {
      const content = response.choices[0].message.content.trim();
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        console.log('🎯 Parsed Result:', parsed);
      }
    } catch (parseError) {
      console.log('⚠️ JSON parsing failed, but response received');
    }
    
  } catch (error) {
    console.error('❌ GPT-o3 LAB Analysis Failed:');
    console.error('Error:', error.message);
  }
}

testO3LabAnalysis().catch(console.error);