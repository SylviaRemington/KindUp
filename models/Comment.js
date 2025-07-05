// Comment Schema Model
// This will define what a comment is for my app - e.g. the comment content &
// & a reference to the user who wrote it.

/*
INFORMATION I NEED TO ADD IN MODEL SO THAT EACH COMMENT IS LINKED TO THE USER WHO WROTE IT:
General info from chatgpt --
What do I need to create to make sure each comment knows who wrote it? Don't give me code.
You don’t need a new file.
✅ In models/Comment.js, add a reference to the User (the one who wrote the comment). // so double check syntax from lecture on Mongoose Relationships & Skyrockit.
✅ In controllers/comment-actions.js, when someone submits a comment, include the logged-in user's ID in the data you save.
*/

// I want to use a comment schema that has:
// TEXT - STRING - this would be the actual comment the user wrote
// USER - NEED OBJECT ID - References the user who wrote the comment & links user to the text-string-comment
// KINDACT - NEED OBJECT ID - Links the kindact to the comment (so that if I want to look up all the comments for one kindact, I have that option.)
// CREATED TIMESTAMP with date/time - DATE - So creating a timestamp of when the comment was created.


const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema ({

})

