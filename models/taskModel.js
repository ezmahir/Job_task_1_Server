const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 50 },
  description: { type: String, required: true, maxlength: 200 },
  timestamp: { type: Date, default: Date.now },
  category: { type: String, enum: ['To-Do', 'In Progress', 'Done'], default: 'To-Do' },
  order: {type: Number}
});

module.exports = mongoose.model('Task', taskSchema);
