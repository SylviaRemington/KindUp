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


// This version below defines and exports the model in one step.
// module.exports = mongoose.model('KindAct', kindActSchema);