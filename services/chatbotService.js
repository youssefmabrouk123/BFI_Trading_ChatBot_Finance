const OpenAI = require('openai');

class FreeChatbot {
  constructor() {
    this.client = new OpenAI({
      baseURL: "https://api.together.xyz/v1",
      apiKey: process.env.TOGETHER_API_KEY || "your-free-api-key",
    });
  }

  async chat(messages) {
    const systemPrompt = {
      role: "system",
      content: `You are a financial assistant specializing in Forex, economy, and business finance.
You help users with:
1. Forex market trends, strategies, and common questions
2. Economic indicators (GDP, inflation, interest rates, etc.)
3. Business and investment finance fundamentals
4. Risk management and trading psychology

Guidelines:
- Answer concisely and professionally.
- Do NOT offer personal financial advice.
- If unsure, respond: "I recommend consulting a licensed financial advisor."

Examples of user questions:
- "What is leverage in forex trading?"
- "Explain how inflation affects interest rates."
- "What are safe-haven currencies?"
`
    };

    try {
      const response = await this.client.chat.completions.create({
        model: "mistralai/Mistral-7B-Instruct-v0.1",
        messages: [systemPrompt, ...messages],
        temperature: 0.7,
        max_tokens: 512
      });

      return {
        role: "assistant",
        content: response.choices[0]?.message?.content?.trim() || 
                 "Sorry, I couldn't find the information you're looking for."
      };
    } catch (error) {
      console.error("Chatbot error:", error);
      return {
        role: "assistant",
        content: "Our system is currently unavailable. Please try again later."
      };
    }
  }
}

module.exports = new FreeChatbot();
