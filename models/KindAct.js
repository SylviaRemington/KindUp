// Building the Model with creating the schema, defining the model, and exporting the model

const mongoose = require('mongoose');

// Creating the schema:
const kindActSchema = new mongoose.Schema({
  title: String,
  description: String,
  isTestedRandomActOfKindness: Boolean,
  isBrandNew: Boolean,
  // Each KindAct can have many comments because it's an array & each comment is now linked by its Objectid. And then mongoose will use the Comment Model to populate it.
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

// Defining the model:
const KindAct = mongoose.model('KindAct', kindActSchema);

// Exporting the model:
module.exports = KindAct;


// This version below defines and exports the model in one step. Could use this too instead of lines 9-13.
// module.exports = mongoose.model('KindAct', kindActSchema);

// Maybe should be putting the comment schema in the KindAct scheme??? --still unsure how to make those two work together.
// 34 minutes 40 seconds in Skyrockit Part One - tristan references this but it doesn't make sense to me yet.


