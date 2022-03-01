const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const min = new Schema({
  time: {type: Date},
  value: {type: Number}
});

 module.exports = mongoose.model('Min', min);
