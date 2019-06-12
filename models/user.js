const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  tails: {
    type: Number,
    default: 0,
    required: true,
  },
  heads: {
    type: Number,
    default: 0,
    required: true,
  },
  lastflips: {
    type: Array,
  },
});

module.exports = mongoose.model('user', userSchema);