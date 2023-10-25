var dbConn = require("./../../config/db.config");

var User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.role = user.role;
  this.mobile = user.mobile;

  this.created_at = new Date();
  this.modified_at = new Date();
};

User.findAll = function (result) {
  dbConn.query("Select * from usermaster", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("project : ", res);
      result(null, res);
    }
  });
};

User.findById = function (id, result) {
  dbConn.query(
    "SELECT * FROM usermaster WHERE id = ?",
    id,

    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

User.create = function (newUser, result) {
  dbConn.query(
    "Select * from usermaster where name=? and email=?",
    [newUser.name, newUser.email],
    function (err, res) {
      if (err || res.length > 0) {
        console.log("error: ", err);
        const msg = "already exist";
        result(err, msg);
      } else {
        dbConn.query(
          "INSERT INTO usermaster set ?",
          newUser,
          function (err, res) {
            if (err) {
              console.log("error: ", err);
              result(err, null);
            } else {
              result(null, res.insertId);
            }
          }
        );
      }
    }
  );
};

User.delete = function(id, result){
    dbConn.query("DELETE FROM usermaster WHERE id = ?", [id], function (err, res) {
       if(err) {
           console.log("error: ", err);
           result(null, err);
       }
       else{
           result(null, res);
       }
   }); 
};


User.update = function (id, user, result) {
  dbConn.query(
    "UPDATE usermaster SET name=?,email=?,role=?,mobile=? WHERE id = ?",
    [user.name, user.email, user.role, user.mobile, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = User;
