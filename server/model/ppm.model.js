const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ppm = new Schema({
  time: {type: Date},
  value: {type: Number}
});

 module.exports = mongoose.model('PPM', ppm);
