require('dotenv').config();
process.env.NTBA_FIX_319 = 1;
const axios = require('axios').default;
const tokenEcoBot = process.env.BOT_TOKEN_ECO;

module.exports = {
  async sendPost(data) {
    try {
      await axios.post(`https://api.telegram.org/bot${tokenEcoBot}/sendMessage`, data);
    } catch (e) {
      console.log('e', e);
    }
  },
};
