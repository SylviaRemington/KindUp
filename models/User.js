// Need to put users into the database - So need to create model for it
// This User.js model was created during auth section & correlates with that.
// Need to have a User first before you have a Todo for the user.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    // unique: true, // adding unique with function in code at auth.js line 30
    // There will be a unique id created for this user... And need this user id 
    // in order to create a mongoose relationship & a todo.
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});

const User = mongoose.model('User', userSchema);
// 'User' is where you register the model as 'User' -- and then that info will be put into the todo model under ref: 'User' for the assignee thing 

module.exports = User;


