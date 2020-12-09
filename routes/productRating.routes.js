module.exports = (app) => {
  const productRatings = require("../controllers/product_rating.controller");

  var router = require("express").Router();

  // CREATE A NEW PRODUCTCOM
  router.post("/", productRatings.create);
  // RETRIEVE A SINGLE PRODUCTCOM WITH ID
  router.get("/:id", productRatings.findOne);
  // RETRIEVE ALL PRODUCTCOMS
  router.get("/", productRatings.findAll);
  // RETRIEVE ALL PRODUCTCOMS BY AUTHOR ID
  router.get("/author_id/:id", productRatings.findAllByAuthorId);
  // RETRIEVE ALL PRODUCTCOMS BY ARTICLE ID
  router.get("/product_id/:id", productRatings.findAllByProductId);
  router.get(
    "/product_id/:prodid/author_id/:authid",
    productRatings.findAllByProductAndAuthorId
  );
  // UPDATE A ARTICLEIMAGE WITH ID
  router.put("/:id", productRatings.update);
  // DELETE A SINGLE ARTICLEIMAGE WITH ID
  router.delete("/:id", productRatings.delete);
  // DELETE ALL PRODUCTCOM
  router.delete("/", productRatings.deleteAll);

  app.use("/api/productRatings", router);
};
