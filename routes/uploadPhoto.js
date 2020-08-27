const express = require("express");
const router = express.Router();
const parser = require("../configs/cloudinary");
const Group = require("../models/Group");



router.post("/upload/:groupName", parser.single("photo"), async (req, res, next) => {
   const image_url = req.file.secure_url;
   const {groupName} = req.params;
   //primer valor de donde lo quiero buscar y el segundo el valor que quiero actualizar
   Group.findOneAndUpdate({groupName}, {imageUrl:image_url},{new:true})
   .then((group)=>{
       res.json(group)
   })

   .catch((error) => console.log(error))

  });


module.exports = router;