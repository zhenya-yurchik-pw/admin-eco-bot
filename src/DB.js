require('dotenv').config();
process.env.NTBA_FIX_319 = 1;
const mongoose = require('mongoose');
const dbPass = process.env.DB_PASSWORD;
const dbLogin = process.env.DB_LOGIN;

module.exports = {
  async connectDB() {
    try {
      await mongoose.connect(`mongodb+srv://${dbLogin}:${dbPass}@ecodev.hmydf.mongodb.net/Za?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await console.log('DataBase connected');
    } catch (e) {
      console.log('e', e);
    }
  },
};



