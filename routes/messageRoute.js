const express = require("express");
// DEVUELVE UN OBJETO EN EL CUAL PODRE INGRRESAR RUTAS
const router = express.Router();
const User = require("../models/User");
const Group = require("../models/Group");
const Task = require("../models/Task");
const Message = require("../models/Message");
router.post("/createmessage", (req, res, next) => {
  Message.create({
    messageSender: req.body.messageSender,
    messageReceiver: req.body.messageReceiver,
    myTask: req.body.myTask,
    messageText: req.body.messageText,
    taskToChange: req.body.taskToChange,
  }).then((newMessage) => {
    User.findByIdAndUpdate(
      req.body.messageReceiver,
      { $push: { penddingMess: newMessage._id } },
      { new: true }
    )
      .populate("penddingMess")
      .then((updatedUser) => {
        console.log("aqui", updatedUser);
        res.json(updatedUser);
      })
      .catch((err) => {
        res.json(err);
      });
  });
});
// router.post("/deletemessage/:id", (req, res, next) => {
//     Message.deleteOne({_id:req.params.id})
//      .then(() => {
//        res.json()
//      })
//      .catch((error) => {
//        console.log(error);
//      });
// });
router.delete("/deletemessage/:id", async (req, res, next) => {
  await Message.findByIdAndRemove(req.params.id);
  res.json({ status: "Deleted Task" });
});
// router.delete("/deletemessage/:id", async (req, res, next) => {
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     res.status(400).json({ message: "Specified id is not valid" });
//     return;
//   }
//   const message= await Message.findOne({_id: req.params.id});
//   await message.save();
//   await message.remove();
//   res.json({
//     message: `Project with ${req.params.id} is removed successfully.`,
//   });
// });
//ACTUALIZAR LAS TAREAS DE LOS USUARIOS
// router.post("/message/:id", (req, res, next) => {
//     Task.findByIdAndUpdate({
//       req.body.user, {$push: {penddingMess:newMessage._id}}
//      })
//     .then((newMessage)=>{
//          User.findByIdAndUpdate(req.body.messageReceiver, {$push: {penddingMess:newMessage._id}}, {new: true})
//         .populate("penddingMess")
//         .then((updatedUser)=>{
//             console.log("aqui", updatedUser)
//               res.json(updatedUser);
//         })
//            .catch((err) => {
//               res.json(err);
//             });
//     })
//     });
router.get("/all", (req, res, next) => {
  Message.find()
    .populate("myTask messageSender messageReceiver taskToChange")
    .then((allMessages) => {
      // console.log("todos los mensajes",allMessages)
      return res.json(allMessages);
    });
});
router.get("/:_id", async (req, res, next) => {
  const { _id } = req.params;
  const messageId = await Message.findById(_id);
  return res.json(messageId);
});
module.exports = router;
