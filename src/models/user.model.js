const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  chatId: {
    type: Number,
    required: true,
  },
  telegramId: {
    type: Number,
    required: true,
  },
  name: {
    type:String,
    required: true,
  },
});

mongoose.model("users", UserSchema);
