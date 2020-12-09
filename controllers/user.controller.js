const db = require("../models");
const User = db.user;
//const Role = db.role;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
//const productModel = require("../models/product.model");

exports.allAccess = (req, res) => {
    res.status(200).send("Home>");
  };
  
exports.userBoard = (req, res) => {
  res.status(200).send("Public>");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin>");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator>");
};

// GET ALL USERS FROM DATABASE

exports.findAll = (req, res) =>{
  const username = req.query.username;
  var condition = username ? { username: {[Op.iLike]: `%${username}`}} : null;
  
  
  const User = db.user;
  const Role = db.role;
  db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
  });
  db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
  });
// FIND ALL USERS IN DATABASE
  User.findAll({
    where: condition,
    include: [{
      model: Role,
      attributes: ['name']
    }]
  }).then(data => {
    res.send(data);
  }).catch(err=>{
    res.status(500).send({
      message: err.message || "Some errors occcured while retrieving all users!"
    });
  });
};

// FIND USER BY ID

exports.findByUserID = (req, res)=>{
  const id = req.params.id;
  const User = db.user;
  const Role = db.role;
  db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
  });
  db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
  });

  User.findAll({where: { id: id}, include: [{
    model: Role,
    attributes: ['name']
  }]}).then(data=>{
    res.send(data);
  }).catch(err=>{
    res.status(300).send({
      message: err.message || `Error retrieving User with the specified id=${id}`
    });
  });

};


// USER UPDATE WITH THE SPECIFIED ID
exports.update = (req, res) =>{
  const id = req.params.id;
  req.body.passwordcrypt = bcrypt.hashSync(req.body.password, 8);

    User.update(
      req.body, { 
                  where: { 
                            id : id
                          }
                          /*
                          ,
                  include: [{
                    model: Role,
                    attributes: ['name']
                  }]   
                          */                                  
                }
    ).then(
            num =>{
                     if(num == 1)
                     {
                        res.send({
                          message: "User was modified successfully"
                        });
                     }
                     else
                     {
                        res.send({
                          message: `Cannot modify User with id=${id}. Maybe User was not found or req.body is empty!`
                        });
                     }
                  }
     ).catch(
            err =>{
                    res.status(500).send({
                        message: err.message || `Cannot modify User with id=${id}`
                    });
            }
     );
  
  
};

// DELETE A USER WITH A SPECIFIED ID IN THE REQUEST
exports.delete = (req, res) =>{
  const id = req.params.id;

  User.destroy({
      where:  { id: id}
  }).then(num => {
      if(num == 1){
          res.send({
              message: "User was deleted successfully"
          });
      }
      else{
          res.send({
              message: `Cannot delete User with the specified id=${id}`
          });
      }
  }).catch(err =>{
      res.status(300).send({
          message: err.message || `Could not delete User with id=${id}`
      });
  });
};