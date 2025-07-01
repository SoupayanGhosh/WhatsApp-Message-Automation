require('dotenv').config();

// Validate required environment variables
const requiredEnvVars = ['DEEPSEEK_API_KEY'];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

module.exports = {
    deepseek: {
        apiKey: process.env.DEEPSEEK_API_KEY
    },
    whatsapp: {
        qrCodeOptions: {
            small: true
        }
    }
};
