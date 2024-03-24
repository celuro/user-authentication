const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./user');
const path = require('path');

//Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://celuro:I9vf7XGoqfBhmgm7@userauthceluro.91n2lva.mongodb.net/?retryWrites=true&w=majority&appName=UserAuthCeluro', {});

//Accessing mongoose connection object. It represents connecting to MongoDB database
const db = mongoose.connection;

//Eent listener on the db object for the error eent that gets logged to console
db.on('error', console.error.bind(console, 'MongoDB Connection Error'));

//Eent listener for open eent, if the connection is successful its logged
db.once('open', () => {
  console.log("Connected to MongoDB");
})

//Middleware to parse JSON and url encoded data from HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//Route Handler for registration
app.post('/html/register.html', async (req, res) => {
  //Handles POST request to register 
  try{
    //Client sends these fields to request body
    const { username, email, password} = req.body;
    
    //Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create a new user
    const user = new User({ username, email, password: hashedPassword});

    //Save user to database
    await user.save();
    console.log("User registered successfully");
    res.send('User registered successfully');
  }
  catch (error){
  console.error(error);
  console.log("Error requesting user");
  res.status(500).send("Error requesting user");
  }
});

app.use(express.static(path.join(__dirname, 'html')));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/register', (req, res) => {
  res.sendFile('register.html');
});

app.get('/login', (req, res) => {
  res.sendFile('login.html');
});

app.get('/reset', (req, res) => {
  res.sendFile('reset.html');
});

app.get('/user', (req, res) => {
  res.sendFile(__dirname + 'user.html');
});


const port = 3000;
app.listen(port, () => {
  console.log(`Connected to port: ${port}.`);
});

