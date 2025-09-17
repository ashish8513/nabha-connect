const express = require("express");
const router = express.Router();

// POST /api/symptoms/check-symptoms
router.post("/check-symptoms", async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms) {
      return res.status(400).json({
        success: false,
        error: "Symptoms are required"
      });
    }

    // Create prompt for symptom analysis
    const prompt = `Analyze these symptoms and provide concise home remedy suggestions: "${symptoms}"

    Give 3-4 simple, practical home remedies. Use short sentences. Keep response under 100 words. No medical jargon or complex formatting. Focus on easy-to-follow home treatments.`;

    // Call Cerebras AI using fetch directly
    const response = await fetch('https://api.cerebras.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CEREBRAS_API_KEY || "csk-x8henhx8de2phfjptycjxc6d4c3ctv89erfch4njenp6rmxm"}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-oss-120b",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Cerebras API Error:", response.status, errorText);
      throw new Error(`API call failed: ${response.status}`);
    }

    const data = await response.json();
    let aiResponse = data.choices[0].message.content;
    
    // Ensure warning is included (append if missing)
    const requiredWarning = "⚠️ Warning: These are general suggestions. Please consult a doctor first.";
    if (!aiResponse.includes(requiredWarning)) {
      aiResponse = `${aiResponse}\n\n${requiredWarning}`;
    }

    res.json({
      success: true,
      recommendations: aiResponse
    });

  } catch (error) {
    console.error("Cerebras AI Error:", error);
    
    // Fallback mock response if Cerebras API fails
    const mockResponse = `For your symptoms, here are some home remedies:

• Rest and stay hydrated
• Apply heat or cold as needed
• Take over-the-counter pain relief
• Get plenty of sleep

⚠️ Warning: These are general suggestions. Please consult a doctor first.`;

    res.json({
      success: true,
      recommendations: mockResponse
    });
  }
});

module.exports = router;
