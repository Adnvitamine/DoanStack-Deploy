const db = require("../models");
const Article = db.article;
const Op = db.Sequelize.Op;

// Function create a new article

exports.create = (req, res) => {
  // First we validate request
  if (
    !req.body.title &&
    !req.body.content &&
    !req.body.author &&
    !req.body.description
  ) {
    res.status(400).send({
      message: "Article name, description, vendor cannot be empty",
    });
  } else if (!req.body.content) {
    res.status(400).send({
      message: "Description field is empty :(",
      status: "400",
    });
  } else if (!req.body.title) {
    res.status(400).send({
      message: "Title field is empty :(",
      status: "400",
    });
  } else if (!req.body.author) {
    res.status(400).send({
      message: "Vendor field is empty :(",
      status: "400",
    });
  } else {
    const article = {
      title: req.body.title,
      description: req.body.description,
      color: req.body.color,
      content: req.body.content,
      author: req.body.author,
      author_id: req.body.author_id,
      author_avatar: req.body.author_avatar,
      image: req.body.image,
      link: "",
      category: req.body.category,
      published: req.body.published ? req.body.published : false,
    };

    Article.create(article)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some errors occured while creating the Article",
        });
      });
  }
};

// RETRIEVE ALL ARTICLES FROM DATABASE
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}` } } : null;
  Article.findAll({
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving articles!",
      });
    });
};

// FIND A SINGLE ARTICLE WITH AN ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Article.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving a article with the specified id = ${id}`,
      });
    });
};

// FIND ALL ARTICLE BY CATEGORY
exports.findAllByCategory = (req, res) => {
  const category = req.params.category;
  Article.findAll({
    where: { category: category, published: true },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message ||
          `Error retrieving a article with the specified category = ${category}`,
      });
    });
};

// FIND ALL PUBLISHED ARTICLES
exports.findArticlePublishedTrue = (req, res) => {
  // const category = req.params.category;
  Article.findAll({
    where: {
      published: true,
      [Op.not]: [{ category: ["Projects", "Snippets"] }],
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message || "Error retrieving all the articles with Status = true",
      });
    });
};

// FIND ALL PUBLISHED Portfolio with category = ['Projects', 'Snippets']
exports.findPortfolioPublishedTrue = (req, res) => {
  // const category = req.params.category;
  Article.findAll({
    where: {
      published: true,
      [Op.and]: [{ category: ["Projects", "Snippets"] }],
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message || "Error retrieving all portfolio with Status = true",
      });
    });
};

exports.findProjectsPublishedTrue = (req, res) => {
  Article.findAll({
    where: {
      published: true,
      [Op.and]: [{ category: ["Projects"] }],
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message || "Error retrieving projects with published = true",
      });
    });
};

// FIND ALL SNIPPETS PUBLISHED TRUE
exports.findSnippetsPublishedTrue = (req, res) => {
  Article.findAll({
    where: {
      published: true,
      [Op.and]: [{ category: ["Snippets"] }],
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message || "Error retrieving snipppets with published = true",
      });
    });
};

//FIND ALL ARTICLE WITH A SPECIFIED AUTHOR
exports.findAllByAuthor = (req, res) => {
  const author = req.params.author;

  Article.findAll({
    where: { author: author },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message ||
          `Error retrieving all the articles with Vendor=${vendor}`,
      });
    });
};

//FIND ALL ARTICLE WITH A SPECIFIED AUTHOR Id
exports.findAllByAuthorId = (req, res) => {
  const author_id = req.params.id;

  Article.findAll({
    where: { author_id: author_id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message ||
          `Error retrieving all the ARTICLEs with Vendor_id=${author_id}`,
      });
    });
};

// UPDATE A ARTICLE WITH A SPECIFIED ID
exports.update = (req, res) => {
  const id = req.params.id;

  Article.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Article was updated succesfully",
        });
      } else {
        res.send({
          message: `Cannot update Article with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(300).send({
        message: err.message || `Cannot update Article with id ${id}`,
      });
    });
};

// DELETE A ARTICLE WITH A SPECIFIED ID IN THE REQUEST
exports.delete = (req, res) => {
  const id = req.params.id;

  Article.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Article was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete Article with the specified id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(300).send({
        message: err.message || `Could not delete Article with id=${id}`,
      });
    });
};

// DELETE ALL ARTICLES FROM DATABASE
exports.deleteAll = (req, res) => {
  Article.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Article were deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message || `Some errors occured when deleting all the articles`,
      });
    });
};
