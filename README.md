# MadCool Festival tickets availability checker

This project aims at checking the availability of MadCool festival tickets.
It can be used to check any event's (or anything else) availability.

## Run
 - Install dependencies with `yarn`
 - Copy the .env.example to a .env file
 - Replace the environment variables (see the table bellow)
 - Run with `node index.mjs`
 - Optionally, if you want to check that it notifies as expected, add the `--debug=true` option
    

## Environment variables
| Variable   |      Description      |  Mandatory |
|----------|-------------|------|
| TELEGRAM_TOKEN |  It's the token of your bot, [see how to create a bot](https://sendpulse.com/knowledge-base/chatbot/create-telegram-chatbot) | **No** but if it's not given, you won't be notified by Telegram |
| TELEGRAM_CHAT_ID |  It's the chat the bot should send a message to. [See how to get a chat's id](https://sean-bradley.medium.com/get-telegram-chat-id-80b575520659) | **No** but if it's not given, you won't be notified by Telegram |
| SLACK_WEBHOOK_URL | The URL of your webhook to be notified on a Slack channel. See [how to get a webhook url](https://api.slack.com/messaging/webhooks) | **No** but if it's not given, you won't be notified by Slack |