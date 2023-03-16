const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  Title:{
  type: String,
  required: true
},
  Lead_Actor:{
  type: String,
  required: true
},
  Length:{
  type: String,
  required: true
},
  Description:{
  type: String,
  required: true
}
},
{
  collection:'movies'
}
);

module.exports = mongoose.model('MovieModel', MovieSchema);
