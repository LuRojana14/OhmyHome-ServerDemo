const express = require("express");
// DEVUELVE UN OBJETO EN EL CUAL PODRE INGRRESAR RUTAS
const router = express.Router();
const mongoose = require("mongoose");
const Task = require("../models/Task");
const Group = require("../models/Group");
const User = require("../models/User");
// RUTA PARA AGREGAR TAREAS(DATOS)
router.post("/tasks", async (req, res, next) => {
  const { namegroup, userId } = req.body;
  let taskId;
  const newTask = await Task.create({
    title: req.body.title,
    state: "pending",
  });
  taskId = newTask._id;
  const group = await Group.findOne({ groupName: namegroup });
  group.tasks.push(newTask);
  await group.save();
  newTask.group = group;
  await newTask.save();
  return res.json(newTask);
});
// RUTA DELETE TASK
router.delete("/tasks/:id", async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  const task = await Task.findOne({ _id: req.params.id });
  const user = await User.findOne(task.user);
  user.tasks.pull(task._id);
  await user.save();
  const group = await Group.findOne(task.group);
  await group.tasks.pull(task._id);
  await group.save();
  await task.remove();
  // Now that the user is updated, lets update the one in the session
  req.session.currentUser = user;
  res.json({
    message: `Project with ${req.params.id} is removed successfully.`,
  });
});
router.get("/tasks/:groupName", async (req, res) => {
  const { groupName } = req.params;
  const group = await Group.findOne({ groupName });
  const tasks = await Task.find({ group }).populate("user");
  return res.json(tasks);
});
router.post("/tasks/assign", async (req, res, next) => {
  const { taskId, userId } = req.body;
  const user = await User.findOne({ _id: userId });
  const task = await Task.findOne({ _id: taskId });
  task.user = user;
  await task.save();
  user.tasks.push(task);
  await user.save();
  res.json();
});

router.post("/tasks/reassign", async (req, res, next) => {
  const { myTaskId, yourTaskId, userFromId, userToId } = req.body;
  await User.findByIdAndUpdate(userFromId, { $pull: { tasks: myTaskId } });
  await User.findByIdAndUpdate(userToId, { $push: { tasks: myTaskId } });
  await User.findByIdAndUpdate(userToId, { $pull: { tasks: yourTaskId } });
  await User.findByIdAndUpdate(userFromId, { $push: { tasks: yourTaskId } });
  res.status(200).send();
});

//SE PODRAN DEFINIR RUTAS DE MI SERVIDOR
module.exports = router;
