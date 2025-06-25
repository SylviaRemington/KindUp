const mongoose = require('mongoose');

// Creating the schema:
const kindActSchema = new mongoose.Schema({
  title: String,
  description: String
});

// Defining the model:
const KindAct = mongoose.model('KindAct', kindActSchema);

// Exporting the model:
module.exports = KindAct;


// This version below defines and exports the model in one step. Could use this too instead of lines 9-13.
// module.exports = mongoose.model('KindAct', kindActSchema);