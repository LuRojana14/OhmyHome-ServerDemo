const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const groupSchema = new Schema(
  {
    groupName: { type: String, required: true },
    password: [String],
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    imageUrl: String,
    listItems: [String],
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
