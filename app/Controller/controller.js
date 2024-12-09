const path=require('path')
const modelPath=require(path.join(__dirname,'..','Model','model.js'))
exports.createData =(req,res)=>{
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    // Create a modelPath
    const Data = new modelPath({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    });

    // Save modelPath in the database
    modelPath.create(Data, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the modelPath."
        });
        else res.send(data);
    });


}; 
// Retrieve all modelPath from the database (with condition).
// Retrieve objects
exports.findAllData = (req, res) => {
    const title = req.query.title;

  modelPath.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving modelPath."
      });
    else res.send(data);
  });
  
};

// // Find a single modelPath with a id
// // Retrieve a single object
exports.findOneData = (req, res) => {
    modelPath.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found modelPath with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving modelPath with id " + req.params.id
            });
          }
        } else res.send(data);
      });
  
};

// // find all published modelPath
exports.findAllPublishedData = (req, res) => {
    modelPath.getAllPublished((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving published modelPath."
            });
        } else res.send(data);
    });
};

// // Update a modelPath identified by the id in the request
exports.updateData = (req, res) => { 
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  modelPath.updateById(
    req.params.id,
    new modelPath(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found modelPath with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating modelPath with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
  
};

// // Delete a modelPath with the specified id in the request
exports.deleteData = (req, res) => {
    modelPath.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found modelPath with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete modelPath with id " + req.params.id
            });
          }
        } else res.send({ message: `modelPath was deleted successfully!` });
      });
  
};

// // Delete all modelPath from the database.
exports.deleteAllData = (req, res) => {
    modelPath.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all modelPaths."
          });
        else res.send({ message: `All modelPaths were deleted successfully!` });
      });
  
};