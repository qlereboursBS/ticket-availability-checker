import dotenv from 'dotenv';
dotenv.config();
import TelegramBot from 'node-telegram-bot-api';
import request from 'request';

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const telegramBot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

export const notify = (message) => {
  if (TELEGRAM_TOKEN && TELEGRAM_CHAT_ID) {
    telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
  } else {
    console.warn('Telegram token or chat id is missing');
  }

  if (SLACK_WEBHOOK_URL) {
    postToSlack(message);
  } else {
    console.warn('Slack webhook url is missing');
  }
}

const postToSlack = (text) => {
  request.post(
    {
      headers: { 'Content-type': 'application/json' },
      url: SLACK_WEBHOOK_URL,
      form: { payload: JSON.stringify({ text }) }
    },
    (error, res, body) => console.error(error, body, res.statusCode)
  );
};