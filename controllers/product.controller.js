const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;

// Function create a new product

// CREATE AND SAVE A NEW PRODUCT
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.description || !req.body.vendor) {
    res.status(400).send({
      message: "Some fields are empty! :(",
      status: "400",
    });
  } else {
    // Create a Tutorial
    const product = {
      name: req.body.name,
      vendor: req.body.vendor,
      vendor_id: req.body.vendor_id,
      vendor_avatar: req.body.vendor_avatar,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category,
      status: req.body.status ? req.body.status : false,
    };

    // Save Tutorial in the database
    Product.create(product)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Product.",
        });
      });
  }
};

// FIND A SINGLE PRODUCT WITH AN ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving a product with the specified id = ${id}`,
      });
    });
};

// RETRIEVE ALL PRODUCTS FROM DATABASE
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}` } } : null;

  Product.findAll({
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving products!",
      });
    });
};

// FIND ALL PRODUCT BY CATEGORY
exports.findAllByCategory = (req, res) => {
  const category = req.params.category;

  Product.findAll({
    where: { category: category, status: true },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message ||
          `Error retrieving a product with the specified category = ${category}`,
      });
    });
};

// FIND ALL PUBLISHED PRODUCTS
exports.findProductStatusTrue = (req, res) => {
  //const status = req.params.true;
  Product.findAll({
    where: { status: true },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message || "Error retrieving all the products with Status = true",
      });
    });
};
//FIND ALL PRODUCT WITH A SPECIFIED VENDOR
exports.findAllByVendor = (req, res) => {
  const vendor = req.params.vendor;

  Product.findAll({
    where: { vendor: vendor },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message ||
          `Error retrieving all the products with Vendor=${vendor}`,
      });
    });
};

//FIND ALL PRODUCT WITH A SPECIFIED VENDOR Id
exports.findAllByVendorId = (req, res) => {
  const vendor_id = req.params.id;

  Product.findAll({
    where: { vendor_id: vendor_id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message ||
          `Error retrieving all the products with Vendor_id=${vendor_id}`,
      });
    });
};

// UPDATE A PRODUCT WITH A SPECIFIED ID
exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was updated succesfully",
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(300).send({
        message: err.message || `Could not delete Product with id ${id}`,
      });
    });
};

// DELETE A PRODUCT WITH A SPECIFIED ID IN THE REQUEST
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete Product with the specified id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(300).send({
        message: err.message || `Could not delete Product with id=${id}`,
      });
    });
};

// DELETE ALL PRODUCTS FROM DATABASE
exports.deleteAll = (req, res) => {
  Product.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Product were deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message || `Some errors occured when deleting all the products`,
      });
    });
};
