module.exports = app => {
    const articlecoms = require("../controllers/articlecom.controller");

    var router = require("express").Router();

    // CREATE A NEW ARTICLECOM
    router.post("/", articlecoms.create);
    // RETRIEVE A SINGLE ARTICLECOM WITH ID
    router.get("/:id", articlecoms.findOne);
    // RETRIEVE ALL ARTICLECOMS
    router.get("/", articlecoms.findAll);
    // RETRIEVE ALL ARTICLECOMS BY AUTHOR ID
    router.get("/author_id/:id", articlecoms.findAllByAuthorId);
    // RETRIEVE ALL ARTICLECOMS BY ARTICLE ID
    router.get("/article_id/:id", articlecoms.findAllByArticleId);
    // UPDATE A ARTICLEIMAGE WITH ID
    router.put("/:id", articlecoms.update);
    // DELETE A SINGLE ARTICLEIMAGE WITH ID
    router.delete("/:id", articlecoms.delete);
    // DELETE ALL ARTICLECOM
    router.delete("/", articlecoms.delete);

    app.use("/api/articlecoms", router);
}