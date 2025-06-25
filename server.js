// KindUp App - creating random acts of kindness & upleveling the world


// -----------------------------IMPORTS----------------------------------------------------

const dotenv = require('dotenv');
dotenv.config(); //putting dotenv at top & this gives us access to process.env.MONGODB_URI
const express = require('express');
// EJS - don't need to require ejs because express automatically is designed to find it. (I think this is correct, but need to double check.)
const mongoose = require('mongoose');
const KindAct = require('./models/KindAct.js'); //importing the model into server.js



// -----------------------------PORT SETUP-------------------------------------------------

const port = process.env.PORT || 3000;
// This (process.env.PORT) means that it is processing/running the environment variable settings on Port 3000.
// Also, if nothing is in the .ev file under PORT= , it will default to 3000.



// -----------------------------APP SETUP-------------------------------------------------
// App needs to come after the imports because it uses code from the imports.

const app = express(); // creating the app using express so can build out routes, handle requests & send responses



// ------------------------MONGOOSE CONNECT METHOD-----------------------------------------

// MongoDB Connection - connection to the database //also connecting via mongoose gives more feedback vs try catch 
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
});



// -----------------------------MIDDLEWARE-------------------------------------------------



// -----------------------------ROUTES-----------------------------------------------------

// TEST ROUTE TO CONFIRM SERVER IS WORKING PROPERLY
// app.get('/', (req, res) => {
//   res.send('Hello, all you supahstaaars out there!')
// });

// HOMEPAGE ROUTE
app.get('/', async (req, res) => {
    // res.send('Hello, friend! This will be our homepage once it has been set up!');
    res.render('index.ejs'); 
});



// ----------Starts the app and tells it to listen for requests on PORT (3000)-------------

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

























// -----------------------------CODE GRAVEYARD---------------------------------------------

// CAN USE THIS BELOW INSTEAD OF WHAT I HAVE ABOVE IN THE FUTURE IF I WANT TO:
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });