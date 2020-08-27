const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    namegroup: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    penddingMess: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
