require("dotenv").config(); // Load variables from .env

const express = require("express");
const app = express();

// Importing required modules
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Path = require("path");
const userModel = require("./models/users");
const cookieParser = require("cookie-parser");
const { hash } = require("crypto");
const PORT = process.env.PORT || 3000;

// Setting the view engine to EJS
app.set("view engine", "ejs");
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware to serve static files
app.use(express.static(Path.join(__dirname, "public")));
// Middleware to parse cookies
app.use(cookieParser());

// Sign up page
app.get("/", (req, res) => {
  res.render("signup");
});

// Encrypt the password
app.post("/create", async (req, res) => {
  let { username, email, password, age } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        username: username,
        email: email,
        password: hash,
        age: age,
      });

      // Main Part communicate with token.
      let token = jwt.sign({email}, process.env.JWT_SECRET);
      res.cookie("token", token);
      res.send(user);
    });
  });
});

//Login page
app.get("/login", (req, res)=>{
  res.render("login");
})

app.post("/login",async (req, res)=>{
  const {email, password} = req.body;
  let user = await userModel.findOne({email});
  if(!user) return res.status(404).send("Something went wrong");
  bcrypt.compare(password,user.password,(err, result)=>{
    if(result){
      let token = jwt.sign({email}, process.env.JWT_SECRET);
      res.cookie("token", token);
      res.send("Login successfully");
    }
    else res.send("Something went wrong");
  });
})

//Logout method - just remove the token and redirect to sign page.
app.get("/logout",(req, res)=>{
  res.cookie("token", "");
  res.redirect("/");
})

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
