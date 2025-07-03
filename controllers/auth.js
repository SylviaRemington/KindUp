const express = require('express');
const router = express.Router(); 
//Router creates an object where we can define all of our end points & get methods.
//Will be moving a lot of the app.gets into the Router and out of the server.js
//Router is a piece of middleware.

const User = require("../models/User.js"); //import our models

router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
});
// localhost:3000/auth/sign-up

// SIGN OFF ROUTE
// router.get("/sign-off", (req, res) => {
//     res.send('sign off route');
// });

// First Version
// router.post("/sign-up", (req, res) => {
//     res.send("submitted the form to create a new user");
// });

// Second Version
// router.post("/sign-up", async (req, res) => {
//   res.send("Form submission accepted!");
// });

//Third Version
router.post("/sign-up", async (req, res) => {
    //Enforcing unique usernames
    const userInDatabase = await User.findOne({username: req.body.username});

    // looking for if user is unique
    if (userInDatabase) {
        return res.send("Username already taken.");
    }

    // looking for if passwords do not match
    if (req.body.password !== req.body.confirmPassword) {
        res.send("Passwords do not match.");
    }

    
});



module.exports = router; //exporting router from here