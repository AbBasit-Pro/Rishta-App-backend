const { saveUser, getAllUsers } = require('../models/userModel');
const { getMatchFromGemini } = require('../services/geminiService');
const { sendWhatsAppMessage } = require('../services/whatsappService');

async function handleMatch(req, res) {
  try {
    const user = req.body;

    // Save to DB
    saveUser(user, (err) => {
      if (err) console.log('DB save error:', err);
    });

    // Get Gemini AI match suggestion
    const rawMatch = await getMatchFromGemini(user);

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

    // Send WhatsApp message
    await sendWhatsAppMessage(user.phone, match);

    // Respond JSON
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

async function getAllMatches(req, res) {
  try {
    getAllUsers((err, results) => {
      if (err) {
        console.error('DB fetch error:', err);
        return res.status(500).json({
          success: false,
          title: '❌ Failed to Fetch Records',
          error: 'Database Error'
        });
      }

      res.status(200).json({
        success: true,
        title: '📄 All Match Requests',
        count: results.length,
        users: results
      });
    });
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({
      success: false,
      title: '❌ Server Error',
      error: 'Internal Server Error'
    });
  }
}

module.exports = { handleMatch, getAllMatches };
