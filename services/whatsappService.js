const axios = require('axios');
require('dotenv').config();

async function sendWhatsAppMessage(to, body) {
  const url = `https://api.ultramsg.com/${process.env.ULTRAMSG_INSTANCE_ID}/messages/chat`;

  const response = await axios.post(url, {
    token: process.env.ULTRAMSG_TOKEN,
    to: to,
    body: body
  });

  return response.data;
}

module.exports = { sendWhatsAppMessage };
