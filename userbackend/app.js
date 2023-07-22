//Create Express APP
const express = require('express');
const app = express();
app.listen(3000, () => console.log('Server gestartet'));

//CORS
const cors = require('cors');
app.use(cors());

//Parse requests to JSON
app.use(express.json());

//DATABSE CONNECTION
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
.then(() =>{
  console.log("Connected to Databse");
})
.catch(err =>{
  console.error(err);
});

//Set the Routes for Users
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

//Set the Routes for Icons
const iconsRouter = require('./routes/icons');
app.use('/icons', iconsRouter);

module.exports = app;

