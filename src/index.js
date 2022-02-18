require('dotenv').config();
process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const kb = require('./keyboard-buttons');
const keyboard = require('./keyboard');
const { getChatId } = require('./helper');
const { sendPost } = require('./API');
const { connectDB } = require('./DB');
const token = process.env.BOT_TOKEN;
const bannedCommands = ['/start', kb.createPost, kb.sendPost];

require('./models/user.model');

connectDB();

const User = mongoose.model('users');

const bot = new TelegramBot(token, {
  polling: true,
});

let post = '';

bot.onText(/\/start/, (msg) => {
  const text = `Здравствуйте, ${msg.from.first_name}`;
  sendHTML(getChatId(msg), text, 'createPost');
});
bot.on('polling_error', (err) => console.log(`err`, err));
bot.on('text', ({ chat, text }) => {
  const isBotMsg = bannedCommands.includes(text);
  if (isBotMsg) return;
  post = text;
  const msgText = `Вы готовы отправить пост выше всем подписчикам бота?`;
  sendHTML(chat.id, msgText, 'sendPost');
});
bot.on('message', (msg) => {
  const chatId = getChatId(msg);
  switch (msg.text) {
    case kb.createPost:
      createPost(chatId);
      break;
    case kb.sendPost:
      sendPostToAllUsers(post, chatId);
      break;
    case kb.deleteDraftPost:
      deleteDraftPost();
      break;
    default:
      break;
  }
});

async function createPost(chatId) {
  sendHTML(chatId, 'Отправьте в ответ текст поста 👇');
  cleanPostStorage();
}

async function sendPostToAllUsers(text, adminChatId) {
  const users = await User.find();
  users.map(async ({ chatId }) => {
    const data = {
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML',
    };
    await sendPost(data);
  });
  sendHTML(adminChatId, 'Посты были отправлены всем подписчикам', 'createPost');
  cleanPostStorage();
}

function deleteDraftPost(adminChatId) {
  cleanPostStorage();
  sendHTML(adminChatId, 'Последний пост был удален, создайте новый пост', 'createPost');
}

function cleanPostStorage() {
  post = '';
}

function sendHTML(chatId, html, kbName = null, kbInline = null) {
  const options = {
    parse_mode: 'HTML',
  };

  options['reply_markup'] = kbName
    ? {
        keyboard: keyboard[kbName],
      }
    : {
        remove_keyboard: true,
      };

  if (kbInline) {
    options['reply_markup'] = {
      inline_keyboard: typeof kbInline === 'string' ? inlineKeyboards[kbInline] : kbInline,
    };
  }

  bot.sendMessage(chatId, html, options);
}
