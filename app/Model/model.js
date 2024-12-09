const path=require('path')
const db=require(path.join(__dirname,'..','Config','DBConfig.js'))
const Tutorial = function(tutorial) {
    this.title = tutorial.title;
    this.description = tutorial.description;
    this.published = tutorial.published;
};
exports.create = (newTutorial, result) => {
    db.run("INSERT INTO tutorials SET ?", newTutorial, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
      result(null, { id: res.insertId, ...newTutorial });
    });
  };





//   // Find tutorial by ID
exports.findById = (id, result) => {
    const query = `SELECT * FROM tutorials WHERE id = ?`;
    db.get(query, [id], (err, res) => {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
        return;
      }
      res ? result(null, res) : result({ kind: "not_found" }, null);
    });
  };
  
  // Retrieve all tutorials with optional title filter
  exports.getAll = (title, result) => {
    let query = `SELECT * FROM tutorials`;
    const params = [];
  
    if (title) {
      query += ` WHERE title LIKE ?`;
      params.push(`%${title}%`);
    }
  
    db.all(query, params, (err, res) => {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    });
  };
  
  // Retrieve all published tutorials
  exports.getAllPublished = (result) => {
    const query = `SELECT * FROM tutorials WHERE published = 1`;
    db.all(query, (err, res) => {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    });
  };
  
  // Update tutorial by ID
  exports.updateById = (id, tutorial, result) => {
    const query = `UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?`;
    db.run(
      query,
      [tutorial.title, tutorial.description, tutorial.published, id],
      function (err) {
        if (err) {
          console.error("Error: ", err);
          result(err, null);
          return;
        }
        this.changes === 0
          ? result({ kind: "not_found" }, null)
          : result(null, { id, ...tutorial });
      }
    );
  };
  
  // Delete tutorial by ID
  exports.remove = (id, result) => {
    const query = `DELETE FROM tutorials WHERE id = ?`;
    db.run(query, [id], function (err) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
        return;
      }
      this.changes === 0
        ? result({ kind: "not_found" }, null)
        : result(null, this);
    });
  };
  
  // Delete all tutorials
  exports.removeAll = (result) => {
    const query = `DELETE FROM tutorials`;
    db.run(query, function (err) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
        return;
      }
      result(null, this);
    });
  };