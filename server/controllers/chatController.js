const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chat = async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: `You are BloodSync's helpful AI assistant. You help users with questions about:
- Blood types and compatibility
- Blood donation eligibility and guidelines
- How BloodSync works (finding donors, posting requests, registering as donor)
- General blood donation facts and myths
- WHO donation guidelines (56 day cooldown, age limits, weight limits)

Keep answers short, friendly and helpful. Use simple language.
If someone asks something unrelated to blood donation or BloodSync, politely say you can only help with blood donation topics.
Never give specific medical advice — always suggest consulting a doctor for medical decisions.`,
    });

    // Build chat history for context
    const chatHistory = (history || []).map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const chatSession = model.startChat({ history: chatHistory });
    const result = await chatSession.sendMessage(message);

    res.json({ reply: result.response.text() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { chat };