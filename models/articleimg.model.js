module.exports = (sequelize, Sequelize) => {
    const Articleimg = sequelize.define("articleimg", {
        path: {
            type: Sequelize.STRING(500)
        },
        author_id: {
            type: Sequelize.INTEGER
        },
        article_id: {
            type: Sequelize.INTEGER
        }
    });
    return Articleimg;
}