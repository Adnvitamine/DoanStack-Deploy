module.exports = app => {
    const articleimgs = require("../controllers/articleimg.controller");

    var router = require("express").Router();

    // CREATE A NEW ARTICLEIMG
    router.post("/", articleimgs.create);
    // RETRIEVE A SINGLE ARTICLEIMG WITH ID
    router.get("/:id", articleimgs.findOne);
    // RETRIEVE ALL ARTICLEIMGS
    router.get("/", articleimgs.findAll);
    // RETRIEVE ALL ARTICLEIMGS BY AUTHOR ID
    router.get("/author_id/:id", articleimgs.findAllByAuthorId);
    // RETRIEVE ALL ARTICLEIMGS BY ARTICLE ID
    router.get("/article_id/:id", articleimgs.findAllByArticleId);
    // UPDATE A ARTICLEIMAGE WITH ID
    router.put("/:id", articleimgs.update);
    // DELETE A SINGLE ARTICLEIMAGE WITH ID
    router.delete("/:id", articleimgs.delete);
    // DELETE ALL ARTICLEIMG
    router.delete("/", articleimgs.delete);

    app.use("/api/articleimgs", router);
}