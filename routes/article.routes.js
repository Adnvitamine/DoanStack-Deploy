module.exports = (app) => {
  const articles = require("../controllers/article.controller.js");

  var router = require("express").Router();

  // Create a new article
  router.post("/", articles.create);
  // Retrieve a single article with id
  router.get("/:id", articles.findOne);
  // Retrieve all articles
  router.get("/", articles.findAll);
  // Find all articles by category
  router.get("/post/:category", articles.findAllByCategory);
  // Retrieve all articles with status = true
  router.get("/post/published/true", articles.findArticlePublishedTrue);
  // Retrieve all articles by Vendor name
  router.get("/author/:author", articles.findAllByAuthor);
  // Retrieve all articles by Author name
  router.get("/author_id/:id", articles.findAllByAuthorId);
  // Update a article with id
  router.put("/:id", articles.update);
  // Delete a single article with id
  router.delete("/:id", articles.delete);
  // Delete all articles
  router.delete("/", articles.deleteAll);

  app.use("/api/articles", router);
};
