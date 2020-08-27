const express = require("express");
// DEVUELVE UN OBJETO EN EL CUAL PODRE INGRRESAR RUTAS
const router = express.Router();
const User = require("../models/User");
const Group = require("../models/Group");
const Task = require("../models/Task");
//CREAR LA RUTA A MI PERFIL
router.get("/", (req, res, next) => {
  if (req.session.currentUser._id) {
    User.findOne({ _id: req.session.currentUser._id })
      //POPULE DEL MODELO TASK
      .populate("tasks penddingMess")
      //LAS PROPIEDADES ANIDADAS
      .then((myUser) => {
        res.json(myUser);
      })
      .catch((error) => {
        console.log("Error");
      });
  }
});
////PUT
router.put("/addtask/:id", (req, res, next) => {
  //id se lo paso por params solo necesito el user, se lo paso desde el front
  const { username } = req.body;
  const { id } = req.params;
  console.log("hola");
  //buscar el usuario para asignarle la tarea, el primer parametro es por donde buscamos (por nombre)
  //en mi array vacio q viene del modelo tengo q agregar la tarea por id
  User.findOneAndUpdate({ username }, { $push: { tasks: id } }, { new: true })
    .then((user) => {
      Task.findByIdAndUpdate(id, { user_id: user._id }, { new: true })
        //otra promesa que me devuelve un then
        .then((task) => {
          console.log(task);
          res.json("task");
        });
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
