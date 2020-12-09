module.exports = (app) => {
  const products = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Create a new product
  router.post("/", products.create);
  // Retrieve a single product with id
  router.get("/:id", products.findOne);
  // Retrieve all products
  router.get("/", products.findAll);
  // Find all products by category
  router.get("/shop/:category", products.findAllByCategory);
  // Retrieve all products with status = true
  router.get("/shop/status/true", products.findProductStatusTrue);
  // Retrieve all products by Vendor name
  router.get("/vendor/:vendor", products.findAllByVendor);
  // Retrieve all products by Vendor Id
  router.get("/vendor_id/:id", products.findAllByVendorId);
  // Update a product with id
  router.put("/:id", products.update);
  // Delete a single product with id
  router.delete("/:id", products.delete);
  // Delete all products
  router.delete("/", products.deleteAll);

  app.use("/api/products", router);
};
