const db = require("../models");
const ProductRating = db.productrating;
const Op = db.Sequelize.Op;

// Function create a new product image

// CREATE AND SAVE a product image
exports.create = (req, res) => {
  // Validate request

  // Create a productrating
  const productrating = {
    product_id: req.body.product_id,
    author_id: req.body.author_id,
    rating: req.body.rating,
  };

  // Save productrating in the database
  ProductRating.create(productrating)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the ProductRating.",
      });
    });
};

// FIND A SINGLE PRODUCT COMMENT WITH AN ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  ProductRating.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving a productrating with the specified id = ${id}`,
      });
    });
};

// RETRIEVE ALL PRODUCTS COMMENTS FROM DATABASE
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}` } } : null;

  ProductRating.findAll({
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving productratings!",
      });
    });
};

//FIND ALL PRODUCTCOMS WITH A SPECIFIED Author Id
exports.findAllByAuthorId = (req, res) => {
  const author_id = req.params.id;

  ProductRating.findAll({
    where: { author_id: author_id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message ||
          `Error retrieving all the productratings with Vendor_id=${vendor_id}`,
      });
    });
};

//FIND ALL PRODUCTCOMS WITH A SPECIFIED product Id
exports.findAllByProductId = (req, res) => {
  const product_id = req.params.id;

  ProductRating.findAll({
    where: { product_id: product_id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message ||
          `Error retrieving all the productratings with Vendor_id=${vendor_id}`,
      });
    });
};

//FIND ALL PRODUCTCOMS WITH A SPECIFIED product Id
exports.findAllByProductAndAuthorId = (req, res) => {
  const product_id = req.params.prodid;
  const author_id = req.params.authid;

  ProductRating.findAll({
    where: { product_id: product_id, author_id: author_id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message ||
          `Error retrieving all the productratings with Vendor_id=${vendor_id}`,
      });
    });
};

// UPDATE A PRODUCTCOM WITH A SPECIFIED ID
exports.update = (req, res) => {
  const id = req.params.id;

  ProductRating.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ProductRating was updated succesfully",
        });
      } else {
        res.send({
          message: `Cannot update ProductRating with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(300).send({
        message: err.message || `Could not delete ProductRating with id ${id}`,
      });
    });
};

// DELETE A PRODUCTCOM WITH A SPECIFIED ID IN THE REQUEST
exports.delete = (req, res) => {
  const id = req.params.id;

  ProductRating.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ProductRating was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete ProductRating with the specified id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(300).send({
        message: err.message || `Could not delete ProductRating with id=${id}`,
      });
    });
};

// DELETE ALL PRODUCTCOMS FROM DATABASE
exports.deleteAll = (req, res) => {
  ProductRating.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} ProductRating were deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message ||
          `Some errors occured when deleting all the productratings`,
      });
    });
};
