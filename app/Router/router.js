 
const express=require('express');
const router = express.Router();
const path=require('path')
const controller = require(path.join(__dirname,'..','Controller','controller.js'));
// router.get("/", controller.createTable);
router.post("/", controller.createData);

  // Retrieve all controller
  router.get("/", controller.findAllData);

//   // Retrieve all published controller
  router.get("/published", controller.findAllPublishedData);

//   // Retrieve a single Tutorial with id
  router.get("/:id", controller.findOneData);

//   // Update a Tutorial with id
  router.put("/:id", controller.updateData);

//   // Delete a Tutorial with id
  router.delete("/:id", controller.deleteData);

//   // Delete all controller
  router.delete("/", controller.deleteAllData);

  
module.exports=router;