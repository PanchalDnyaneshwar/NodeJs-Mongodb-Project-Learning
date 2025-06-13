require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.URL);

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
  },
});

module.exports = mongoose.model("user",userSchema);
