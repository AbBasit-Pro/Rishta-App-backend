const { saveUser } = require('../models/userModel');
const { getMatchFromGemini } = require('../services/geminiService');
const { sendWhatsAppMessage } = require('../services/whatsappService');

async function handleMatch(req, res) {
  try {
    const user = req.body;

    // 1. Save to database
    saveUser(user, (err) => {
      if (err) console.log('DB save error:', err);
    });

    // 2. Get match suggestion from Gemini
    const rawMatch = await getMatchFromGemini(user);

    // 3. Beautify the match response
    const match = `
🌟 *AI Rishta Match Suggestion* 🌟

👤 *Candidate:* ${user.name} (${user.age} years old from ${user.location})
🎯 *Preferences:* ${user.preferences}

💌 *Suggested Match by AI:*
────────────────────────────
${rawMatch}
────────────────────────────

📲 *Sent via WhatsApp to:* ${user.phone}
    `.trim();

    // 4. Send match to WhatsApp
    await sendWhatsAppMessage(user.phone, match);

    // 5. Send attractive JSON response
    res.status(200).json({
      success: true,
      title: '🎉 Match Sent Successfully!',
      to: user.phone,
      user: {
        name: user.name,
        age: user.age,
        location: user.location,
        preferences: user.preferences
      },
      matchSummary: rawMatch,
      whatsappMessage: match
    });
  } catch (error) {
    console.error('Match Error:', error);
    res.status(500).json({
      success: false,
      title: '❌ Match Generation Failed',
      error: 'Internal Server Error. Please try again later.'
    });
  }
}

module.exports = { handleMatch };
