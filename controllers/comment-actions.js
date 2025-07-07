// This controller file handles the comment actions (create, update, delete functionality).
// Handling routes and functions

// This will contain my routes and the logic (e.g. what happens when a comment is created or deleted).
// Make sure to require and run this file of comment-actions.js in my server.js file


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

router.get('/test', (req, res) => {
  res.send('TEST MESSAGE: Comment controller is connected and working.');
});

// Create the comment route
router.post('/', async (req, res) => {

    try {
        //Creates a new comment in the database.
        const comment = await Comment.create({
            
            //This below saves comment into the database. (It takes the text the user typed in the form, and saves it in the text field of the comment in the database.)
            text: req.body.text,

            //This below links the comment to the logged-in user by grabbing their user id from the session.
            user: req.session.user._id,

            //This below links the comment to the specific KindAct by using the hidden input from the form.
            kindact: req.body.kindactId
        });//Done creating the comment part

        //Finds the KindAct the comment belongs to
        const kindact = await KindAct.findById(req.body.kindactId);

        //This below adds the comment id to the KindAct's list of comments.
        kindact.comments.push(comment._id);

        //This below saves the updated KindAct with the new comment attached.
        await kindact.save();

        //After saving, this sends the user back to the showpage so that they can see their comment.
        res.redirect(`/kindacts/${req.body.kindactId}`);

    //If something goes wrong, this then shows an error message.
    } catch (err) {
        console.log(err);
        res.send('Error posting comment.');
    }
});

// ! Stretch Goals - create an edit comment section & delete comment section
// Edit comment
// Delete comment



module.exports = router;

