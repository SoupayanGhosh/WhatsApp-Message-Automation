const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const config = require('./src/config/config');
const nlpService = require('./src/services/nlp.service');
const openAIService = require('./src/services/openai.service');
const fs = require('fs');
const { exec } = require('child_process');
const dbService = require('./src/services/db.service');
const chalk = require('chalk');

console.log(`
  #############################################################################
  #$$\\      $$\\ $$$$$$$$\\ $$\\       $$$$$$\\   $$$$$$\\  $$\\      $$\\ $$$$$$$$\\ #
  #$$ | $\\  $$ |$$  _____|$$ |     $$  __$$\\ $$  __$$\\ $$$\\    $$$ |$$  _____|#
  #$$ |$$$\\ $$ |$$ |      $$ |     $$ /  \\__|$$ /  $$ |$$$$\\  $$$$ |$$ |      #
  #$$ $$ $$\\$$ |$$$$$\\    $$ |     $$ |      $$ |  $$ |$$\\$$\\$$ $$ |$$$$$\\    #
  #$$$$  _$$$$ |$$  __|   $$ |     $$ |      $$ |  $$ |$$ \\$$$  $$ |$$  __|   #
  #$$$  / \\$$$ |$$ |      $$ |     $$ |  $$\\ $$ |  $$ |$$ |\\$  /$$ |$$ |      #
  #$$  /   \\$$ |$$$$$$$$\\ $$$$$$$$\\\\$$$$$$  | $$$$$$  |$$ | \\_/ $$ |$$$$$$$$\\ #
  #\\__/     \\__|\\________|\\________|\\______/  \\______/ \\__|     \\__|\\________|#
  #############################################################################
`);

console.log(
  chalk.blueBright.bold('                   WhatsApp Automation Assistant')
);
console.log(
  chalk.whiteBright.bgGreen.bold('                        Made by Soupayan Ghosh\n')
);

class WhatsAppBot {
    constructor() {
        console.log('Initializing WhatsApp bot...');
        this.client = new Client({
            authStrategy: new LocalAuth(),
            puppeteer: {
                headless: false, // Show browser for debugging
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--disable-gpu'
                ]
            }
        });
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        console.log('Setting up event handlers...');
        this.client.on('qr', this.handleQR.bind(this));
        this.client.on('ready', this.handleReady.bind(this));
        this.client.on('message', this.handleMessage.bind(this));
        this.client.on('error', this.handleError.bind(this));
        this.client.on('disconnected', this.handleDisconnect.bind(this));
        this.client.on('loading_screen', (percent, message) => {
            console.log(percent + '%');
        });
        this.client.on('authenticated', () => {
            console.log('AUTHENTICATED');
        });
        this.client.on('auth_failure', msg => {
            console.error('AUTHENTICATION FAILURE', msg);
        });
    }

    handleQR(qr) {
        try {
            console.log('QR Code received. Please scan with WhatsApp...');
            qrcode.generate(qr, config.whatsapp.qrCodeOptions);
        } catch (err) {
            console.error('Error generating QR code:', err);
        }
    }

    handleReady() {
        console.log('WhatsApp client is ready!');
    }

    async handleMessage(message) {
        try {
            console.log('Received message:', message.body);
            // Get sender's contact name
            const contact = await message.getContact();
            const senderName = contact.pushname || contact.name || contact.number || 'Unknown';
            // Save message to database
            dbService.saveMessage(senderName, message.body).catch(err => {
                console.error('Failed to save message to DB:', err);
            });
            const messageCategory = nlpService.classify(message.body);
            
            if (messageCategory !== 'unknown') {
                const response = nlpService.getResponse(messageCategory);
                await message.reply(response);
            } else {
                const aiResponse = await openAIService.getResponse(message.body);
                await message.reply(aiResponse);
            }
        } catch (error) {
            console.error('Error processing message:', error);
            await message.reply('I apologize, but I\'m having trouble processing your request. Please try again later.');
        }
    }

    handleError(error) {
        console.error('WhatsApp client error:', error);
        if (error && error.message && error.message.includes('Failed to launch the browser process')) {
            console.error('Puppeteer failed to launch. Try running: npm install puppeteer --force');
        }
    }

    handleDisconnect(reason) {
        console.log('Client was disconnected:', reason);
    }

    initialize() {
        console.log('Starting WhatsApp client initialization...');
        this.client.initialize()
            .catch(error => {
                console.error('Failed to initialize WhatsApp client:', error);
                process.exit(1);
            });
    }
}

// Check for WhatsApp Desktop before starting the bot
function checkAndLaunchWhatsAppDesktop() {
    const user = process.env.USERNAME || process.env.USER || '';
    const possiblePaths = [
        `C:/Users/${user}/AppData/Local/WhatsApp/WhatsApp.exe`,
        `C:/Program Files/WhatsApp/WhatsApp.exe`,
        `C:/Program Files (x86)/WhatsApp/WhatsApp.exe`
    ];
    for (const path of possiblePaths) {
        if (fs.existsSync(path)) {
            console.log(`WhatsApp Desktop is installed at: ${path}. Launching WhatsApp Desktop...`);
            exec(`"${path}"`, (err) => {
                if (err) {
                    console.error('Failed to launch WhatsApp Desktop:', err);
                }
            });
            process.exit(0);
        }
    }
    console.log('WhatsApp Desktop is not installed in common locations. Proceeding with WhatsApp Web in browser...');
}

checkAndLaunchWhatsAppDesktop();

// Start the bot
try {
    console.log('Creating WhatsApp bot instance...');
    const bot = new WhatsAppBot();
    bot.initialize();
} catch (error) {
    console.error('Fatal error starting the bot:', error);
    process.exit(1);
}