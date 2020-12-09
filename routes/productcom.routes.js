module.exports = app => {
    const productcoms = require("../controllers/productcom.controller");

    var router = require("express").Router();

    // CREATE A NEW PRODUCTCOM
    router.post("/", productcoms.create);
    // RETRIEVE A SINGLE PRODUCTCOM WITH ID
    router.get("/:id", productcoms.findOne);
    // RETRIEVE ALL PRODUCTCOMS
    router.get("/", productcoms.findAll);
    // RETRIEVE ALL PRODUCTCOMS BY AUTHOR ID
    router.get("/author_id/:id", productcoms.findAllByAuthorId);
    // RETRIEVE ALL PRODUCTCOMS BY ARTICLE ID
    router.get("/product_id/:id", productcoms.findAllByProductId);
    // UPDATE A ARTICLEIMAGE WITH ID
    router.put("/:id", productcoms.update);
    // DELETE A SINGLE ARTICLEIMAGE WITH ID
    router.delete("/:id", productcoms.delete);
    // DELETE ALL PRODUCTCOM
    router.delete("/", productcoms.delete);

    app.use("/api/productcoms", router);
}