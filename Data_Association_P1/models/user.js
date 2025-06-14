const mongoose = require("mongoose");

mongoose.connect(process.env.URL);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  posts: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
