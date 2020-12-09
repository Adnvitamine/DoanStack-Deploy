module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define("articles", {
    title: {
      type: Sequelize.STRING(50),
    },
    author_id: {
      type: Sequelize.INTEGER,
    },
    author: {
      type: Sequelize.STRING(50),
    },
    author_avatar: {
      type: Sequelize.STRING(255),
    },
    image: {
      type: Sequelize.STRING(255),
    },
    content: {
      type: Sequelize.STRING(10000),
    },
    category: {
      type: Sequelize.STRING(50),
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });
  return Article;
};
