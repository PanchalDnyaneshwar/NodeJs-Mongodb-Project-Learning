const express = require('express');

const {connectMangoDB} = require('./connection');
const {logResReq} = require('./midlewares')

const userRouter = require('./routes/user');

const PORT = 3000;
const app = express();

//Connect DB
connectMangoDB('mongodb://127.0.0.1:27017/user-crud-app')
.then(()=> console.log({status : "Success"}));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(logResReq("logs.txt"));

// Routes
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the User CRUD API!');
});

// Start server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
