const db = require("../models");
const Articlecom = db.articlecom;
const Op = db.Sequelize.Op;

// Function create a new article comment

// CREATE AND SAVE a article comment
exports.create = (req, res) => {
  // Validate request

  // Create a articlecom
  const articlecom = {
    article_id: req.body.article_id,
    author_id: req.body.author_id,
    author: req.body.author,
    author_avatar: req.body.author_avatar,
    email: req.body.email,
    content: req.body.content,
  };

  // Save articlecom in the database
  Articlecom.create(articlecom)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Articlecom.",
      });
    });
};

// FIND A SINGLE ARTICLE COMMENT WITH AN ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Articlecom.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving a articlecom with the specified id = ${id}`,
      });
    });
};

// RETRIEVE ALL ARTICLE COMMENTS FROM DATABASE
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}` } } : null;

  Articlecom.findAll({
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving articlecoms!",
      });
    });
};

//FIND ALL ARTICLECOMS WITH A SPECIFIED Author Id
exports.findAllByAuthorId = (req, res) => {
  const author_id = req.params.id;

  Articlecom.findAll({
    where: { author_id: author_id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message ||
          `Error retrieving all the articlecoms with Vendor_id=${vendor_id}`,
      });
    });
};

//FIND ALL ARTICLECOMS WITH A SPECIFIED article Id
exports.findAllByArticleId = (req, res) => {
  const article_id = req.params.id;

  Articlecom.findAll({
    where: { article_id: article_id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message ||
          `Error retrieving all the articlecoms with Vendor_id=${vendor_id}`,
      });
    });
};

// UPDATE A ARTICLECOM WITH A SPECIFIED ID
exports.update = (req, res) => {
  const id = req.params.id;

  Articlecom.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Articlecom was updated succesfully",
        });
      } else {
        res.send({
          message: `Cannot update Articlecom with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(300).send({
        message: err.message || `Could not delete Articlecom with id ${id}`,
      });
    });
};

// DELETE A ARTICLECOM WITH A SPECIFIED ID IN THE REQUEST
exports.delete = (req, res) => {
  const id = req.params.id;

  Articlecom.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Articlecom was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete Articlecom with the specified id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(300).send({
        message: err.message || `Could not delete Articlecom with id=${id}`,
      });
    });
};

// DELETE ALL ARTICLECOMS FROM DATABASE
exports.deleteAll = (req, res) => {
  Articlecom.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Articlecom were deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(300).send({
        message:
          err.message ||
          `Some errors occured when deleting all the articlecoms`,
      });
    });
};
