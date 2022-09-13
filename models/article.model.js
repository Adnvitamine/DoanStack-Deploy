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
      type: Sequelize.STRING(500),
    },
    image: {
      type: Sequelize.STRING(500),
    },
    link: {
      type: Sequelize.STRING(5000),
    },
    description: {
      type: Sequelize.STRING(10000),
    },
    color: {
      type: Sequelize.STRING(50),
    },
    content: {
      type: Sequelize.STRING(20000),
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
