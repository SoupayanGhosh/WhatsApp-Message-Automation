const natural = require('natural');

class NLPService {
    constructor() {
        this.greetings = [
            'hello', 'hi there', 'hey', 'how are you', 'what\'s up',
            'good morning', 'good afternoon', 'good evening', 'hi'
        ];
        this.farewells = [
            'goodbye', 'bye', 'see you', 'see you later', 'take care',
            'good night', 'have a nice day'
        ];
        this.thanks = [
            'thank you', 'thanks', 'appreciate it', 'thanks a lot',
            'thank you so much', 'thanks!'
        ];
    }

    normalize(text) {
        return text.toLowerCase().replace(/[^a-z0-9 ]/gi, '').trim();
    }

    classify(message) {
        const norm = this.normalize(message);
        if (this.greetings.some(g => this.normalize(g) === norm)) return 'greeting';
        if (this.farewells.some(f => this.normalize(f) === norm)) return 'farewell';
        if (this.thanks.some(t => this.normalize(t) === norm)) return 'thanks';
        return 'unknown';
    }

    getResponse(category) {
        const responses = {
            greeting: [
                'Hello there! How can I help you today?',
                'Hi! Nice to hear from you.',
                'Hey! What can I do for you?',
                'Greetings! How may I assist you?'
            ],
            farewell: [
                'Goodbye! Have a great day!',
                'Take care! See you soon!',
                'Bye! Feel free to message again if you need anything.'
            ],
            thanks: [
                'You\'re welcome!',
                'Glad I could help!',
                'No problem at all!',
                'Anytime!'
            ],
            unknown: [
                'I\'ll try my best to help with that.',
                'Let me look into that for you.',
                'I\'ll process that request for you.'
            ]
        };

        const categoryResponses = responses[category] || responses.unknown;
        return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
    }
}

module.exports = new NLPService();
