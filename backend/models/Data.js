const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  data: {
    iv: { type: String, required: true },
    data: { type: String, required: true },
  },
});

module.exports = mongoose.model('Data', dataSchema);