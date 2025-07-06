// This controller file handles the comment actions (create, update, delete functionality).
// Handling routes and functions

// This will contain my routes and the logic (e.g. what happens when a comment is created or deleted).
// ! Make sure to require and run this file of comment-actions.js in my server.js file


/*
INFORMATION I NEED TO ADD IN CONTROLLERS SECTION OF COMMENT-ACTION FILE SO THAT EACH COMMENT IS LINKED TO THE USER WHO WROTE IT:

General info from chatgpt --
What do I need to create to make sure each comment knows who wrote it? Don't give me code.
You don’t need a new file.
✅ In models/Comment.js, add a reference to the User (the one who wrote the comment). // so double check syntax from lecture on Mongoose Relationships & Skyrockit.
✅ In controllers/comment-actions.js, when someone submits a comment, 
include the logged-in user's ID in the data you save. // REVIEW OLD Mongoose Relationships Lecture & Skyrockit Lecture for this.

*/

const express = require('express');
const router = express.Router();

// const KindAct = require('./KindAct'); 
// const User = require('./User'); 
const KindAct = require('../models/KindAct'); //import our models
const User = require("../models/User.js"); //import our models
const Comment = require('../models/Comment'); //importing the models


// Create the comment



// Delete the comment



module.exports = router;

