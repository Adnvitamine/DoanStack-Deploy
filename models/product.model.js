module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    name: {
      type: Sequelize.STRING(50),
    },
    vendor: {
      type: Sequelize.STRING(50),
    },
    vendor_id: {
      type: Sequelize.INTEGER,
    },
    vendor_avatar: {
      type: Sequelize.STRING(255),
    },
    image: {
      type: Sequelize.STRING(255),
    },
    description: {
      type: Sequelize.STRING(10000),
    },
    price: {
      type: Sequelize.NUMERIC,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    category: {
      type: Sequelize.STRING(30),
    },
    status: {
      type: Sequelize.BOOLEAN,
    },
  });
  return Product;
};
