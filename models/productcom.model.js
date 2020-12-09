module.exports = (sequelize, Sequelize) => {
  const Productcom = sequelize.define("productcom", {
    product_id: {
      type: Sequelize.INTEGER,
    },
    author_id: {
      type: Sequelize.INTEGER,
    },
    author: {
      type: Sequelize.STRING(50),
    },
    author_avatar: {
      type: Sequelize.STRING(100),
    },
    email: {
      type: Sequelize.STRING(50),
    },
    content: {
      type: Sequelize.STRING(255),
    },
  });
  return Productcom;
};
