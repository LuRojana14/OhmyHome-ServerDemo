const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  messageSender: {type : Schema.Types.ObjectId, ref: 'User'},
  messageText: String,
  messageReceiver: {type : Schema.Types.ObjectId, ref: 'User'},
  myTask: {type : Schema.Types.ObjectId, ref: 'Task'},
  taskToChange: {type : Schema.Types.ObjectId, ref: 'Task'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;