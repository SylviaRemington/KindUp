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
const KindAct = require('./KindAct'); //do I add this here? Or only to the controller? I'm confused about this.
const User = require('./User'); //do I add this here? Or only to the controller?

const commentSchema = new mongoose.Schema ({
    text: { type: String, require: true }, 
    //I took off unique: true for comments just in case someone else wrote a similar comment like "Awesome!" - Don't want to limit the amount of times someone says that. lol
    //Original question: should i put unique for comment? Does this prevent multiples of same comment? Or does it make it so user can only comment once?
    
    user: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User' }, // type is object id but not sure how to write it correctly - need to research this
    // ref: 'User' refers to the User Model
     
    kindact: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'KindAct'},
    // would I use KindAct or kindAct for this key:value pair??? Ask Tristan or Purvi
    // ref: 'KindAct' refers to the KindAct Model
    // Decided to use lower case for key. Researched it and this is the appropriate naming convention for this.
    
    timestamp: {},
    // idea for value above - { timestamps: true} - Not sure if this will work.

});

module.exports = mongoose.Model('Comment', commentSchema); //exporting schema model
// had it as module.exports = new mongoose.Model('Comment', commentSchema); //but took off the new part

// 


