require('dotenv').config();
process.env.NTBA_FIX_319 = 1;
const fetch = require('cross-fetch');
const axios = require('axios').default;
const token = process.env.BOT_TOKEN_ECO;

module.exports = {
  async getData() {
    try {
      const res = await fetch(`https://api.thingspeak.com/channels/1379996/feeds.json?results=2`);
      const data = await res.json();
      return data;
    } catch (e) {
      console.log('e', e);
    }
  },
  async sendPost(post) {
    try {
      const res = axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: 79249255,
        text: 'test',
        parse_mode: 'HTML',
      });
      console.log('res', res);
    } catch (e) {
      console.log('e', e);
    }
  },
};
