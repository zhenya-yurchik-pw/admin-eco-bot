require('dotenv').config();
process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
const kb = require('./keyboard-buttons');
const keyboard = require('./keyboard');
const { getChatId } = require('./helper');
const { sendPost } = require('./API');
const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, {
  polling: true,
});

bot.onText(/\/start/, (msg) => {
  const text = `Здравствуйте, ${msg.from.first_name}`;
  sendHTML(getChatId(msg), text, 'createPost');
});
bot.on('polling_error', (err) => console.log(`err`, err));
bot.on('text', ({ chat, text }) => {
  const bannedCommands = ['/start', kb.createPost];
  const isBotMsg = bannedCommands.includes(text);
  if (isBotMsg) return;
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
      sendPost();
      break;
    default:
      break;
  }
});

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

async function createPost(chatId) {
  sendHTML(chatId, 'Отправьте в ответ текст поста 👇');
}
