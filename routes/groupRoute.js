const express = require("express");
// DEVUELVE UN OBJETO EN EL CUAL PODRE INGRRESAR RUTAS
const router = express.Router();
const mongoose = require("mongoose");
const Group = require("../models/Group");
const User = require("../models/User");
const Task = require("../models/Task");

router.post("/creategroup", async (req, res, next) => {
  const { userId, groupName } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { namegroup: groupName } },
    { new: true }
  );

  // Now that the user is updated, lets update the one in the session
  req.session.currentUser = user;

  const group = await Group.create({
    groupName,
    users: [user],
    tasks: [],
    
  });

  res.json(group);
});

router.post("/assignUser", async (req, res, next) => {
  const { userId, groupName } = req.body;

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { namegroup: groupName } },
    { new: true }
  );

  // Now that the user is updated, lets update the one in the session
  req.session.currentUser = user;

  const updatedGroup = await Group.findOneAndUpdate(
    { groupName },
    { $push: { users: user } },
    { new: true }
  );

  res.json(updatedGroup);
});

router.get("/:groupName", (req, res, next) => {
  const theGroup = req.query.username;
  Group.findOne({ groupName: req.params.groupName })
    .populate({ path: "users", model: "User" })
    .populate({ path: "tasks", model: "Task" })
    .then((group) => {
      res.json(group);
    })
    .catch((error) => {
      console.log("Error");
    });
});

router.get("/", async (req, res, next) => {
  const groups = await Group.find();
  res.json(groups);
});

module.exports = router;
