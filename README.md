# WhatsApp Message Automation
<<<<<<< HEAD

Welcome! 👋

This project is designed to make your WhatsApp experience smarter and more efficient. Whether you're looking to automate replies, integrate AI-powered responses, or just want a fun project to explore chat automation, you're in the right place. With a focus on simplicity, reliability, and extensibility, this bot is easy to set up and customize for your needs. If you ever get stuck, check the notes below or reach out for help—happy automating!

## Features

- Auto-response to common message types (greetings, farewells, thanks)
- AI-powered responses for complex queries using your preferred AI provider
- QR code-based WhatsApp Web authentication
- Robust error handling and logging
- Modular and maintainable code structure

## Tech Stack & Libraries Used

This project brings together several modern technologies and open-source libraries:

- **Node.js**: The JavaScript runtime powering the backend logic.
- **whatsapp-web.js**: The core library for interacting with WhatsApp Web, sending/receiving messages, and handling authentication.
- **puppeteer**: Controls a headless (or visible) browser to automate WhatsApp Web.
- **qrcode-terminal**: Renders QR codes in your terminal for easy WhatsApp authentication.
- **natural**: Provides natural language processing (NLP) capabilities for classifying and understanding simple messages.
- **openai**: Connects to OpenAI's API (or other AI providers) for advanced, AI-powered responses.
- **axios**: Handles HTTP requests, especially for AI API calls.
- **dotenv**: Loads environment variables from a `.env` file, keeping your API keys and secrets safe.
- **sqlite3**: Lightweight, file-based database for storing all chat messages, sender names, and timestamps.

**Other requirements:**
- A WhatsApp account (for authentication)
- Node.js (v14 or higher)
- npm or yarn (for dependency management)

> All libraries are open-source and can be easily swapped or extended to fit your needs. See `package.json` for exact versions.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A WhatsApp account
- **API key for your preferred AI provider (e.g., DeepSeek, GPT, Gemini, Llama ,Claude, etc.)**

## Environment Setup: Storing Your API Key

Before running the project, you need to create a `.env` file in the root directory to securely store your API key. This file should **not** be committed to version control if it contains real secrets.

1. In your project root, create a file named `.env`.
2. Add the following line, replacing the placeholder with your actual API key:
   ```
   DEEPSEEK_API_KEY=your-deepseek-api-key-here
   ```
   > If you use a different AI provider, use the appropriate environment variable name as required by your provider (e.g., `OPENAI_API_KEY`, `GEMINI_API_KEY`, etc.).

3. Save the file. The application will automatically load this key at startup.

## Setup

Follow these steps to set up WhatsApp Message Automation:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd WhatsApp-Message-Automation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure your API key:**
   - Create a `.env` file in the root directory.
   - Add your AI provider API key. For example:
     ```
     DEEPSEEK_API_KEY=your-deepseek-api-key-here
     ```
     > Replace `DEEPSEEK_API_KEY` with the correct variable name if your provider requires a specific one (e.g., `OPENAI_API_KEY`, etc.).

4. **Start the bot:**
   ```bash
   npm start
   ```

5. **Authenticate:**
   - Scan the QR code displayed in your terminal using WhatsApp Web on your phone.

6. **You're ready!**
   - The bot will now automatically respond to WhatsApp messages using your configured AI provider.

## Getting an API Key

1. Sign up with your chosen AI provider (such as DeepSeek, OpenAI GPT, Gemini, Llama Cloud, etc.).
2. Subscribe to a suitable plan if required and obtain your API key from the provider's dashboard.

> **Note:** Ensure your API key is valid and has sufficient quota for usage.

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd WhatsApp-Message-Automation
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your API key. For example:
```
DEEPSEEK_API_KEY=your-deepseek-api-key-here
```
> Replace `DEEPSEEK_API_KEY` with the appropriate environment variable name if your provider requires a specific one (e.g., `OPENAI_API_KEY`, etc.).

## Usage

1. Start the bot:
```bash
npm start
```

2. Scan the QR code with WhatsApp Web to authenticate.

3. The bot will now automatically respond to messages:
   - Common messages (greetings, farewells, thanks) using NLP
   - Complex queries using your configured AI provider

## Project Structure

```
├── src/
│   ├── config/
│   │   └── config.js         # Configuration and environment variables
│   └── services/
│       ├── nlp.service.js    # Natural Language Processing service
│       └── openai.service.js # AI integration service (provider-agnostic, name is for legacy reasons)
├── index.js                  # Main application entry point
├── package.json
└── .env                      # Environment variables (create this file)
```

## Error Handling

The application includes comprehensive error handling for:
- Missing environment variables
- WhatsApp connection issues
- Message processing errors
- AI API failures

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Database (Message Storage)

All incoming WhatsApp messages are automatically stored in a local SQLite database file named `chats.db` in the project root. Each entry includes:
- **Sender's name** (or number if name is unavailable)
- **Message content**
- **Timestamp** (when the message was received)

**Table schema:**
```sql
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_name TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## How to Access the SQLite Database

Your WhatsApp messages are stored in a file called `chats.db` in your project's root folder. You can view and explore this data in several easy ways:

### 1. Using the SQLite Command Line (CLI)
If you have SQLite installed on your computer:

1. **Open a terminal** and navigate to your project folder.
2. Run:
   ```sh
   sqlite3 chats.db
   ```
3. At the SQLite prompt, type:
   ```sql
   SELECT * FROM messages;
   ```
   This will show all stored messages, including sender names and timestamps.

### 2. Using a Graphical Tool (Recommended for Beginners)
If you prefer a visual interface, use a free tool like:

- [DB Browser for SQLite](https://sqlitebrowser.org/dl/)
- [DBeaver](https://dbeaver.io/download/)

**Steps:**
1. Download and install your chosen tool.
2. Open the tool and use "Open Database" to select `chats.db` from your project folder.
3. Browse the `messages` table to see all your stored chats, sender names, and timestamps.

### 3. From Node.js (for Developers)
You can add a function to your code to print all messages to the console. For example, in `src/services/db.service.js`:

```js
function printAllMessages() {
    db.all('SELECT * FROM messages', [], (err, rows) => {
        if (err) throw err;
        console.log(rows);
    });
}
```
Call `printAllMessages()` from your code to see the data in your terminal.

**Tip:**
If you ever want to export your data (e.g., to CSV), both the CLI and GUI tools offer export options.
=======
 Automated WhatsApp Messaging Solution
 How to run it:

1. Open PowerShell.
2. Navigate to the project directory:
3. Run the application:
4. Scan the QR code displayed in the PowerShell terminal with your WhatsApp to link the device.

After linking the device, the chatbot will be ready to send automatic replies.
>>>>>>> e7910348aaefeea74ad26dfc3028ad0d005c0c48
