const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statsSchema = new Schema({
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
});


module.exports = mongoose.model('global-stats', statsSchema);