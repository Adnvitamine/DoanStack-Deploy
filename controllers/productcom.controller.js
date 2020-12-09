const db = require("../models");
const Productcom = db.productcom;
const Op = db.Sequelize.Op;

// Function create a new product image

// CREATE AND SAVE a product image
exports.create = (req, res) => {
  // Validate request

  // Create a productcom
  const productcom = {
    product_id: req.body.product_id,
    author_id: req.body.author_id,
    author: req.body.author,
    author_avatar: req.body.author_avatar,
    email: req.body.email,
    content: req.body.content,
  };

  // Save productcom in the database
  Productcom.create(productcom)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Productcom.",
      });
    });
};

// FIND A SINGLE PRODUCT COMMENT WITH AN ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Productcom.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving a productcom with the specified id = ${id}`,
      });
    });
};

// RETRIEVE ALL PRODUCTS COMMENTS FROM DATABASE
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}` } } : null;

  Productcom.findAll({
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving productcoms!",
      });
    });
};

//FIND ALL PRODUCTCOMS WITH A SPECIFIED Author Id
exports.findAllByAuthorId = (req, res) => {
  const author_id = req.params.id;

  Productcom.findAll({
    where: { author_id: author_id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message ||
          `Error retrieving all the productcoms with Vendor_id=${vendor_id}`,
      });
    });
};

//FIND ALL PRODUCTCOMS WITH A SPECIFIED product Id
exports.findAllByProductId = (req, res) => {
  const product_id = req.params.id;

  Productcom.findAll({
    where: { product_id: product_id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message ||
          `Error retrieving all the productcoms with Vendor_id=${vendor_id}`,
      });
    });
};

// UPDATE A PRODUCTCOM WITH A SPECIFIED ID
exports.update = (req, res) => {
  const id = req.params.id;

  Productcom.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Productcom was updated succesfully",
        });
      } else {
        res.send({
          message: `Cannot update Productcom with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(300).send({
        message: err.message || `Could not delete Productcom with id ${id}`,
      });
    });
};

// DELETE A PRODUCTCOM WITH A SPECIFIED ID IN THE REQUEST
exports.delete = (req, res) => {
  const id = req.params.id;

  Productcom.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Productcom was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete Productcom with the specified id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(300).send({
        message: err.message || `Could not delete Productcom with id=${id}`,
      });
    });
};

// DELETE ALL PRODUCTCOMS FROM DATABASE
exports.deleteAll = (req, res) => {
  Productcom.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Productcom were deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message ||
          `Some errors occured when deleting all the productcoms`,
      });
    });
};
