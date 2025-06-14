const mongoose = require("mongoose");
mongoose.connect(process.env.URL);
const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    content: {
        type: String,
        likes:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        }]
    }
})

 module.exports = mongoose.model("post", postSchema);