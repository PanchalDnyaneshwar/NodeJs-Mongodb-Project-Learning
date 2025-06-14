require('dotenv').config();
const express = require('express');
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Data Association p1');
});

app.get("/create", async(req, res)=>{
    let user = await userModel.create({
        username: "dnyanu",
        email: "dnyanu@email.com",
        age: 24
    });
    res.send(user);
});

app.get("/users", async(req,res)=>{
    let users = await userModel.find({});
    res.send(users);
})

app.get("/create/post", async(req, res)=>{
    let post = await postModel.create({
        postdata: "post 1",
        user: "684d8f7f2c7256695ab2993b",
    })
    
    let user = await userModel.findOne({_id: "684d8f7f2c7256695ab2993b"});
    user.posts.push(post._id);
    await user.save();
    res.send({post, user});
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});

