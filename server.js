// KindUp App - An app for creating random acts of kindness & upleveling the world
// Note to self: Added basic CRUD functionality & basic signin/signup auth functionality
// Note to self: Create a user relationship (connecting user to comment) - with mongoose relationships & used referencing/reference relationship since it's better long term than embedded.
// Note to self: Added middleware to stay signed in.
// Note to self: Added basic styling via Bulma for KindUp App - though would like to explore a lot more styling possibilities.
// ! Still need to deploy online
// ! 1st Stretch Goal - connect-flash section - need to build this out so get success message after signup & sign in - e.g. "You've successfully signed up!" & "You've successfully signed in!"


// -----------------------------IMPORTS----------------------------------------------------

const dotenv = require('dotenv'); //requiring package
dotenv.config(); //putting dotenv at top & this ensures that the environment variables are available everywhere across the application & this loads the environment variables from .env file
const express = require('express');
// EJS - don't need to require ejs because express automatically is designed to find it. (I think this is correct, but need to double check.)
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan'); //serves as a logging tool that tells us what is coming in
const session = require('express-session');
// Add connect-mongo if want to stay signed in via session every time server restarts
// If I decide to use it, I can find connect-mongo in Level Up section of MEN Stack Session Auth

// Auth Router holds all the authorization endpoints / importing the authController
const authController = require('./controllers/auth.js');

// Comment Router / importing the commentController
const commentController = require('./controllers/comment-actions.js');

// Importing KindAct model into server.js
const KindAct = require('./models/KindAct.js'); //importing the model into server.js

// connect-flash allows a success message to pop up after sign up or sign in
// ! need to finish the rest of this and build this out
const flash = require('connect-flash');

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

// ERROR TROUBLESHOOTING CODE
// mongoose.connection.on('error', err => {
//   console.error('MongoDB connection error:', err);
// });


// -----------------------------MIDDLEWARE-------------------------------------------------


app.use(express.urlencoded({ extended: false })); //allows us to get request bodies (e.g. req.body)
//If using html forms that send data using POST, must use the above code.
//"This middleware parses incoming request bodies, extracting form data and converting it 
// into a JavaScript object. It then attaches this object to the req.body property of the 
// request, making the form data easily accessible within our route handlers." (this explanation is from chatgpt and me trying to understand middleware.)
// Note: got this explanation from ChatGPT. And slightly tweaking it to fit my understanding of how Middleware looks.

app.use(methodOverride("_method")); // method override so I can do PUT and DELETE requests

app.use(morgan("dev")); // morgan for logging / logging http requests

//Express-Session Module in the middleware
//Need to check authentication before we go into any controller functions - so putting above controllers - e.g. /auth & authController below
// THIS PART LOOKS FOR THE SESSIONS (the express-sessions) & asks "Should we send an is-logged-in or is-logged-out status "
app.use(
  session({
    // The SESSION_SECRET is what is being used to encrypt the data.
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// authController - Sensitive data can come from our controllers, so we want to check authentication before we proceed to controllers section here
app.use("/auth", authController); //invoke auth here / importing auth here / This goes from here to the controller file and finds the auth

//commentController - If a request starts with /comments, it redirects these particular routes & requests to the commentController (which contains the logi for these routes).
// It connects the /comments url to my comment-actions.js file
// If someone submits a comment POST form, it will check/match that url & run the login inside controllers/comment-actions.js
// It only runs middleware (router middleware) for urls which start with /comments
app.use('/comments', commentController);


// Creating using middleware, as per project requirements, "to restrict access to specific features (authorization), ensuring they are not accessible to anonymous users." // kinda confused about this part
// DOUBLE CHECK IF DOING THIS PART CORRECTLY -- don't fully understand this below and why i need it (when I'm already logged in).
// Creating a function that says you can't go to the page unless you're logged in.
/* FURTHER EXPLANATION OF THIS: 
“Make a function called isLoggedIn.
It takes in three things:
req, which is the incoming request from the browser,
res, which is the response we’ll send back,
and next, which means ‘move forward to the next step if allowed.’
Inside the function, check if req.session.user is missing —
that means the session does not have a saved user, so the person is not signed in.
If there is no req.session.user, send them to the sign-in page.
If there is a req.session.user, it means the person is signed in,
so call next() and let them continue to the page they were trying to visit.” */
// Could also make this function and call it 'isLoggedIn' but requireLogin works better for me right now with understanding it.
function requireLogin(req, res, next) {
  //When the user signs in, we put a session on the user & pass it around the request response cycle
  if (!req.session.user) {
    return res.redirect('/auth/sign-in');
  }
  //If user is logged in, it goes to next; otherwise, it redirects back to sign in page.
  next();
}

// ! connect-flash -- Add connect-flash middleware here & change secret portion
app.use(session({
  secret: 'your secret here',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

// -----------------------------ROUTES-----------------------------------------------------

// ! I'm still confused (after watching Skyrockit Lectures) as to how to move all these routes 
// ! in server.js to controllers and how to separate them out.

// TEST ROUTE TO CONFIRM SERVER IS WORKING PROPERLY
// app.get('/', (req, res) => {
//   res.send('Hello, all you supahstaaars out there!')
// });


// HOMEPAGE ROUTE - '/' --------------------------------------------------------------------
app.get('/', async (req, res) => {
    // res.send('Hello, friend! This will be our homepage once it has been set up!');
    res.render('index.ejs', {

      //modifying the landing page & index route by adding a user object
      // This express-session package is working with all the requests and seeing if there is a cookie on the request.
      // Then says, "Ok, user is logged in and now will send info to the index.ejs and render that page."
      // And this is now stored in the browser. //If the session is still there, then the user stays logged in.
      // MAKING SURE YOU'RE SIGNED IN.
      user: req.session.user,
      // This gives the page access to the person who is currently signed in, so it can show their name or custom links.
      // I am giving this page a variable named user, and that variable holds the signed-in user’s info from the session — so the page knows who is logged in and can show the right things like “Welcome” or “Sign Out.”
    }); 
});

app.get("/vip-lounge", requireLogin, (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the Kind Movement Partaaay and VIP Lounge, ${req.session.user.username}! This is a place to share ideas & experiences as a VIP member!`);
    // ! Need to build this (VIP LOUNGE) out as a stretch goal if I have time.
  } else {
    res.send("Sorry, no sign-in allowed. You aren't an existing user yet. But we'd love to have you!");
  }
});


// INDEX ROUTE - for index-of-kind-acts.ejs - /KINDACTS ---------------------------------
app.get('/kindacts', requireLogin, async (req,res) => {
  const allKindActs = await KindAct.find(); //setting up finding KindActs in database
  res.render("kindacts/index-of-kind-acts.ejs", { kindacts: allKindActs });
});
/*
EXPLANATION OF WHAT ABOVE CODE IS DOING FOR kindacts: allKindActs part - note for myself:
-I'm creating a route to show all the kind acts.
-When I write { kindacts: allKindActs }, I'm sending the data I got from the database into the EJS file.
-That way, my EJS file can use the kind acts and show them on the page.
-I'm not retrieving data with that part — I'm just passing it along so the EJS can display it.
*/

// POST ROUTE - for form on new.ejs - /KINDACTS
// Initial post route to make sure code is working:
// app.post('/kindacts', (req, res) => {
  // console.log('This page is working.');//is logging in terminal
//   console.log(req.body);
//   res.redirect('/kindacts/new');
// });

// POST ROUTE - for new.ejs - /KINDACTS
app.post('/kindacts', requireLogin, async (req, res) => {
  // Convert checkbox values to true/false
  req.body.isTestedRandomActOfKindness = req.body.isTestedRandomActOfKindness === 'on';
  req.body.isBrandNew = req.body.isBrandNew === 'on'; //request body is the data from the form
  try {
    await KindAct.create(req.body); // saves to MongoDB
    res.render('kindacts/new.ejs', {success: true}); 
  } catch (err) {
    console.log(err);
    res.send('Error saving new kind act', err);
  }
});
// for post route - could also do, if req.body.isTestedRandomActOfKindness === 'on' and then do,
// req.body.isTestedRandomActOfKindness = true;} else {request.body.isTested... = false;}
// then can await KindAct.create(req.body); and then redirect to diff page when done


// ----------------------------------------------------------------------------------------

// NEW ROUTE - for new.ejs - /KINDACTS/NEW
app.get('/kindacts/new', requireLogin, async (req, res) => { //this is the url route
  res.render('kindacts/new.ejs'); //this is a file path relative to views/
});


// ----------------------------------------------------------------------------------------

// SHOWPAGE ROUTE - /KINDACTS/:KINDACTID - to make links from index-of-kind-acts.ejs dynamic
app.get('/kindacts/:kindactId', requireLogin, async (req, res) => {
  
  // This gets the ID from the URL — the part after /kindacts/ (e.g. /kindacts/64a7b2fcd847c12345abcd) — and uses it to find one specific Kind Act in the database.
  // So, it's requesting the parameters of the url // It's requesting the kindactId.
  const foundKindAct = await KindAct.findById(req.params.kindactId).populate({
    path: 'comments',
    populate: {path: 'user'}
  }); 
  // What everything after .populate does (above):
  // It loads all comments & loads all the user info for each comment.
  // populate({ path: 'comments' }): This goes and fetches all the comment documents connected to the KindAct.
  // populate: { path: 'user' }: This goes, and for each comment, it also fetches the user document linked/connected to that comment.
  // From adding this populate function to my showroute, it now allows me to go to showpage at show.ejs and write <%= comment.user.username %>, because now user is loaded in system and available (and not just an id)

  // console.log(foundKindAct);
  // res.send(`This route renders the showpage for title: ${req.params.kindactId}.`);
  // res.send(`This route renders the showpage for the Kind Act named: ${foundKindAct.title}.`);
  res.render('kindacts/show.ejs', { 
    kindact: foundKindAct, //getting all the data from the database to put into ejs file
    success: req.query.success === 'true', //if url includes success message, then show success message from top of show.ejs page
  });
});


// DELETE ROUTE - on showpage
app.delete('/kindacts/:kindactId', requireLogin, async (req, res) => {
  // res.send("This is the delete route.");
  const kindactId = req.params.kindactId;
  await KindAct.findByIdAndDelete(kindactId);
  res.redirect('/kindacts');
});


// PUT ROUTE - ON /KINDACTS/:KINDACTID 
app.put('/kindacts/:kindactId', requireLogin, async (req, res) => {
  if (req.body.isTestedRandomActOfKindness === 'on') {
    req.body.isTestedRandomActOfKindness = true;
  } else {
    req.body.isTestedRandomActOfKindness = false;
  }

  if (req.body.isBrandNew === 'on') {
    req.body.isBrandNew = true;
  } else {
    req.body.isBrandNew = false;
  }

  await KindAct.findByIdAndUpdate(req.params.kindactId, req.body);

  // adding query parameters so can redirect to message pop up that it was updated
  res.redirect(`/kindacts/${req.params.kindactId}?success=true`);
});


// ----------------------------------------------------------------------------------------

// EDIT ROUTE - /kindacts/:kindactId/edit
app.get('/kindacts/:kindactId/edit', requireLogin, async (req, res) => {
  // res.send(`This is the edit page for ${req.params.kindactId}`);
  //update defining route so more dynamic and works with edit page and communicates with database
  const foundKindActForEditPage = await KindAct.findById(req.params.kindactId);
  res.render('kindacts/edit.ejs', { kindact: foundKindActForEditPage });
});


// ----------------------------------------------------------------------------------------

// Starts the app and tells it to listen for requests on PORT (3000)

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

/*

THIS IS MY DELETE AND PUT ROUTES FROM ABOVE BEFORE I ADDED THE ADDTL FUNCTION THAT ONLY USERS ARE ALLOWED TO DELETE & EDIT THEIR KIND ACTS:

DELETE ROUTE - on showpage
app.delete('/kindacts/:kindactId', requireLogin, async (req, res) => {
  res.send("This is the delete route.");/ THIS WAS COMMENTED OUT
  const kindactId = req.params.kindactId;
  await KindAct.findByIdAndDelete(kindactId);
  res.redirect('/kindacts');
});

PUT ROUTE - ON /KINDACTS/:KINDACTID 
app.put('/kindacts/:kindactId', requireLogin, async (req, res) => {
  if (req.body.isTestedRandomActOfKindness === 'on') {
    req.body.isTestedRandomActOfKindness = true;
  } else {
    req.body.isTestedRandomActOfKindness = false;
  }

  if (req.body.isBrandNew === 'on') {
    req.body.isBrandNew = true;
  } else {
    req.body.isBrandNew = false;
  }

  await KindAct.findByIdAndUpdate(req.params.kindactId, req.body);

  adding query parameters so can redirect to message pop up that it was updated
  res.redirect(`/kindacts/${req.params.kindactId}?success=true`);

});

*/

// CAN USE THIS BELOW INSTEAD OF WHAT I HAVE ABOVE IN THE FUTURE IF I WANT TO:
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

/*
ADDTL CODE VERSION FOR POST ROUTE FOR new.ejs using if else version:
app.post('/kindacts', async (req, res) => {
  Convert checkboxes using full if/else
  if (req.body.isTestedRandomActOfKindness === 'on') {
    req.body.isTestedRandomActOfKindness = true;
  } else {
    req.body.isTestedRandomActOfKindness = false;
  }

  if (req.body.isBrandNew === 'on') {
    req.body.isBrandNew = true;
  } else {
    req.body.isBrandNew = false;
  }

  try {
    await KindAct.create(req.body); // Save to MongoDB
    res.render('kindacts/new.ejs', { success: true }); // Show success message
  } catch (err) {
    console.log(err);
    res.send('Error saving new kind act');
  }
});

*/

/*
ADDTL INFORMATION ABOUT DIFFERENCE BETWEEN AUTHENTICATION & AUTHORIZATION:

Many functions of protected routes are related to authorization & authentication, 
which sound very similar, but have a key difference:

Authentication confirms that you are who you say you are. The app recognizes you.

Authorization confirms that you are allowed to do something specific. 
The app lets you do something because of who you are.

Simply put, being a signed-in user doesn’t give you total power over everything 
in an application, and we rely on the logic of protected routes to allow users 
to manage their specific resources, without letting them alter anyone else’s.

*/

