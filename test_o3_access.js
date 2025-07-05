import OpenAI from 'openai';

async function testO3Access() {
  console.log('🔑 Testing GPT-o3 model access...');
  
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ No OpenAI API key found');
    return;
  }
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  try {
    console.log('📡 Making test call to GPT-o3...');
    
    const response = await openai.chat.completions.create({
      model: "o3",
      max_completion_tokens: 100,
      messages: [
        {
          role: "system",
          content: "You are a test assistant."
        },
        {
          role: "user", 
          content: "Respond with exactly: 'GPT-o3 is working correctly'"
        }
      ]
    });
    
    console.log('✅ GPT-o3 Response:', response.choices[0].message.content);
    console.log('📊 Usage:', response.usage);
    console.log('🏷️ Model:', response.model);
    
  } catch (error) {
    console.error('❌ GPT-o3 Access Failed:');
    console.error('Error Type:', error.constructor.name);
    console.error('Error Message:', error.message);
    console.error('Error Code:', error.code);
    console.error('Error Status:', error.status);
    
    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', error.response.data);
    }
  }
}

testO3Access().catch(console.error);