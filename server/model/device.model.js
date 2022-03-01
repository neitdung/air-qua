const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const device = new Schema({
  data: String
});

 module.exports = mongoose.model('Device', device);
