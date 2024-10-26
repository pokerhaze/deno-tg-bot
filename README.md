# Deno Telegram Bot with REST API

A Telegram bot built with Deno and grammY, featuring a REST API endpoint. The bot can handle basic commands and messages while also providing HTTP endpoints for health checks and user data.

## Features

- Telegram bot with basic message handling
- REST API endpoints
- Health check endpoint
- Environment variable configuration
- Error handling
- TypeScript support
- Deployable to Deno Deploy

## Prerequisites

- [Deno](https://deno.com/) 1.37 or higher
- A Telegram Bot Token (obtain from [@BotFather](https://t.me/botfather))

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/deno-tg-bot.git
cd deno-tg-bot
```

2. Copy the environment variables file:
```bash
cp .env.example .env
```

3. Update the `.env` file with your Telegram bot token:
```bash
export BOT_TOKEN=your_telegram_bot_token_here
export PORT=8000
```

## Local Development

1. Load environment variables:
```bash
source .env
```

2. Start the bot:
```bash
deno task start
```

The bot will start running on the specified port (default: 8000).

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/users` - Get sample user data
- `POST /webhook` - Telegram webhook endpoint (for production)

## Project Structure

```
.
├── api/
│   ├── health.ts
│   ├── routes.ts
│   └── users.ts
├── bot/
│   ├── bot.ts
│   ├── errorHandler.ts
│   └── handlers.ts
├── utils/
│   └── helpers.ts
├── config.ts
├── main.ts
└── README.md
```

## Deployment to Deno Deploy

1. Create a new project on [Deno Deploy](https://deno.com/deploy)

2. Link your GitHub repository or deploy directly through the Deno Deploy dashboard

3. Add the following environment variables in your Deno Deploy project settings:
    - `BOT_TOKEN`: Your Telegram bot token

4. Configure your deployment settings:
    - Entry point: `main.ts`
    - Environment: `Production`

5. Deploy your application

6. Once deployed, set up your Telegram bot webhook:
```bash
curl -X POST https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-deno-deploy-url.deno.dev/webhook"}'
```

## Development Commands

- Run the bot:
```bash
deno task start
```

- Run with watch mode (for development):
```bash
deno run --watch --allow-net --allow-env main.ts
```

## Security Notes

- Never commit your `.env` file
- Keep your bot token secret
- Use HTTPS in production
- Consider implementing rate limiting for API endpoints

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.