module.exports = (sequelize, Sequelize) =>{
    const Productimg = sequelize.define("productimg", {
        path: {
            type: Sequelize.STRING(500)
        },
        vendor_id: {
            type: Sequelize.INTEGER
        },
        product_id: { 
            type: Sequelize.INTEGER
        }

    });
    return Productimg;
};