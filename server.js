// KindUp App - creating random acts of kindness & upleveling the world

 
// -----------------------------IMPORTS----------------------------------------------------

const express = require('express');
const app = express(); // creating the app using express so can build out routes, handle requests & send responses
const port = 3000;
// Don't need to require ejs because express automatically is designed to find it. (I think this is correct, but need to double check.)


// -----------------------------ROUTES-----------------------------------------------------

// TEST ROUTE TO CONFIRM SERVER IS WORKING PROPERLY
// app.get('/', (req, res) => {
//   res.send('Hello, all you supahstaaars out there!')
// });

// HOMEPAGE ROUTE
app.get('/', async (req, res) => {
    res.send('Hello, friend! This will be our homepage once it has been set up!');
    // res.render('index.ejs'); 
});


// ----------Starts the app and tells it to listen for requests on PORT (3000)-------------

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
