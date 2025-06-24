// KindUp App - creating random acts of kindness & upleveling the world

 
// -----------------------------IMPORTS----------------------------------------------------

const express = require('express');
const app = express(); // creating the app using express so can build out routes, handle requests & send responses
const port = 3000;


// -----------------------------ROUTES-----------------------------------------------------

app.get('/', (req, res) => {
  res.send('Hello, all you supahstaaars out there!')
});




// ----------Starts the app and tells it to listen for requests on PORT (3000)-------------

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
