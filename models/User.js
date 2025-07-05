// Need to put users into the database - So need to create model for it
// This User.js model was created during auth section & correlates with that.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    // unique: true, // adding unique with function in code at auth.js line 30
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;


