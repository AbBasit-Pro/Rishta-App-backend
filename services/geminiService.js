const axios = require('axios');
require('dotenv').config();

async function getMatchFromGemini(user) {
  const prompt = `
Suggest a compatible match based on the following user details:

Name: ${user.name}
Age: ${user.age}
Location: ${user.location}
Preferences: ${user.preferences}
  `;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    }
  );

  return response.data.candidates[0].content.parts[0].text;
}

module.exports = { getMatchFromGemini };
