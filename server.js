// KindUp App - An app for creating random acts of kindness & upleveling the world


// -----------------------------IMPORTS----------------------------------------------------

const dotenv = require('dotenv'); //requiring package
dotenv.config(); //putting dotenv at top & this ensures that the environment variables are available everywhere across the application & this loads the environment variables from .env file
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

// MongoDB Connection - connection to the MongoDB database //also connecting via mongoose gives more feedback vs try catch 
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
});



// -----------------------------MIDDLEWARE-------------------------------------------------


app.use(express.urlencoded({ extended: false }));
//If using html forms that send data using POST, must use the above code.
//This middleware parses incoming request bodies, extracting form data and converting it 
// into a JavaScript object. It then attaches this object to the req.body property of the 
// request, making the form data easily accessible within our route handlers.



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

// NEW ROUTE - for new.ejs
app.get('/kindacts/new', async (req, res) => { //this is the url route
  res.render('kindacts/new.ejs'); //this is a file path relative to views/
});

// POST ROUTE - for form on new.ejs
app.post('/kindacts', (req, res) => {
  console.log('This page is working.');//is logging in terminal
  console.log(req.body);
  res.redirect('/kindacts/new');
});

// ----------Starts the app and tells it to listen for requests on PORT (3000)-------------

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});






















// -----------------------------IDEAS----------------------------------------------------

/*

How would i do this or add this in my app?

IDEA: Random Acts of Kindness - A smartphone scavenger hunt where teams or indivs
race to complete 60+ good-deed-challenges - like bagging someone else's groceries,
sharing inspiring notes, or helping someone move. That would be hilarious if you're 
trying to do good and then people are like what the... like they actually didn't want
their groceries bagged by a random stranger. I think i need to find actual acts of 
kindness that people would really dig receiving.


*/


/*

Have a page list of KindActs you haven't done yet.
Have a page list of completed KindActs you've already done... with maybe a point system. 
After a certain amount of points, you win something awesome like a trip somewhere or a spa day or something. 
Give people an incentive to be kind until they actually be more kind.

Have a page of a comments section where you SHARE AN ACT OF KINDNESS you've witnessed in your day.

*/




// -----------------------------CODE GRAVEYARD---------------------------------------------

// CAN USE THIS BELOW INSTEAD OF WHAT I HAVE ABOVE IN THE FUTURE IF I WANT TO:
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });


