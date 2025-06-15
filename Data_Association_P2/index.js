require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JwtSecretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).send("Invalid or expired token");
  }
}

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/register", async (req, res) => {
  let { username, name, email, age, password } = req.body;

  if (!username || !name || !email || !age || !password) {
    return res.status(400).send("Please fill all the fields");
  }

  let existingUser = await userModel.findOne({ email: email });
  if (existingUser) {
    return res.status(400).send("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  let newUser = await userModel({
    username,
    name,
    email,
    age,
    password: hash,
  });

  await newUser.save();

  let token = jwt.sign(
    { email: email, userid: newUser._id },
    process.env.JwtSecretKey
  );
  res.cookie("token", token);

  return res.status(201).send("User registered successfully");
});

app.get("/login", (req, res) => {
  res.render("login");

  app.post("/login", async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Please fill all the fields");
    }

    let existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).send("User does not exist");
    }

    let isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(400).send("Invalid password");
    }

    let token = jwt.sign(
      { email: email, userid: existingUser._id },
      process.env.JwtSecretKey
    );
    res.cookie("token", token);
    return res.redirect("/profile");
  });
});

app.get("/profile", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email }).populate("posts");
  res.render("profile", {user});
});

app.get("/like/:id", isLoggedIn, async (req, res) => {
  const postId = (req.params.id || "").trim();

  // ✅ Validate ObjectId
  if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).send("Invalid post ID");
  }

  try {
    const post = await postModel.findById(postId).populate("user");

    if (!post) {
      return res.status(404).send("Post not found");
    }

    // ✅ Prevent duplicate likes
    if (!post.likes.includes(req.user.userid)) {
      post.likes.push(req.user.userid);
      await post.save();
    }

    res.redirect("/profile");
  } catch (err) {
    console.error("Like error:", err);
    res.status(500).send("Server Error");
  }
});


app.post("/post", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  if (!user) {
    return res.status(404).send("User not found"); // ✅ return added
  }
  let post = await postModel.create({
    user: user._id,
    content: req.body.content,
  });
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
