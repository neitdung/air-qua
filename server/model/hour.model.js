const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hour = new Schema({
  time: {type: Date},
  value: {type: Number}
});

 module.exports = mongoose.model('Hour', hour);
