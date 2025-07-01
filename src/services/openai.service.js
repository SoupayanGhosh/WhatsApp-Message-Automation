const axios = require('axios');
const config = require('../config/config');

class DeepSeekService {
    constructor() {
        this.apiKey = config.deepseek.apiKey;
        this.apiUrl = 'https://api.deepseek.com/v1/chat/completions';
    }

    async getResponse(message) {
        try {
            const response = await axios.post(
                this.apiUrl,
                {
                    model: 'deepseek-chat',
                    messages: [
                        { role: 'system', content: 'You are a helpful WhatsApp assistant. Keep responses concise and friendly.' },
                        { role: 'user', content: message }
                    ]
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
        } catch (error) {
            console.error('DeepSeek API Error:', error?.response?.data || error.message);
            return "Sorry, I'm temporarily unable to answer questions due to an AI service issue.";
        }
    }
}

module.exports = new DeepSeekService();
