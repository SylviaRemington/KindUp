const mongoose = require('mongoose');

const kindActSchema = new mongoose.Schema({
  title: String,
  description: String
});

module.exports = mongoose.model('KindAct', kindActSchema);