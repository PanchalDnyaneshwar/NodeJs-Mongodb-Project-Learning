const express = require("express");
var cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const app = express();

app.use(cookieParser());

//Encrypt password using bcrypt
app.get("/", (req, res) => {
  bcrypt.hash("Panchal@1234", 10, function (err, hash) {
    console.log(hash);
  });
});


//Check Encrypt password using bcrypt is equal with orginal String
app.get("/pass", (req, res) => {
  let pass = bcrypt.compare("Panchal@1234", "$2b$10$mlChMbdQkPpisPsrXtXDwesuXocibno4/xap/26oA8qu1bdr2WF/u", function (err, hash) {
    console.log(hash);
  });
});

// Generate the token using email and secret key and store in cookie.
app.get("/jwt", (req, res)=>{
    let token = jwt.sign({email: "dnyanu@123.gmail.com"}, "secret");
    res.cookie("token", token).send("stores token in cookie");
    console.log(token);
})

// read the cookie and verifying the original data
app.get("/read", (req, res) => {
  const cookiesr = req.cookies.token;
  console.log(cookiesr);
  let verified = jwt.verify(cookiesr,"secret");
  console.log(verified);
});



app.listen(3000, () => {
  console.log(`server running on http://localhost:${3000}`);
});
