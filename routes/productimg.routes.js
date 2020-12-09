module.exports = app => {
    const productimgs = require("../controllers/productimg.controller.js");
   

    var router = require("express").Router();

    // Create a new productimg
    router.post("/", productimgs.create);
    // Retrieve a single productimg with id
    router.get("/:id",  productimgs.findOne);
    // Retrieve all productimgs
    router.get("/", productimgs.findAll);
    // Retrieve all productimgs by Vendor Id
    router.get("/vendor_id/:id", productimgs.findAllByVendorId);
    // Retrieve all productimgs by Product Id
    router.get("/product_id/:id", productimgs.findAllByProductId);
    // Update a productimg with id
    router.put("/:id",  productimgs.update);
    // Delete a single productimg with id
    router.delete("/:id",  productimgs.delete);
    // Delete all productimgs
    router.delete("/", productimgs.deleteAll);
    

    app.use('/api/productimgs', router);
};