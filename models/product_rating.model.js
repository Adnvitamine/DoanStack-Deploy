module.exports = (sequelize, Sequelize) => {
  const ProductRating = sequelize.define("productrating", {
    product_id: {
      type: Sequelize.INTEGER,
    },
    author_id: {
      type: Sequelize.INTEGER,
    },
    rating: {
      type: Sequelize.INTEGER,
    },
  });
  return ProductRating;
};
