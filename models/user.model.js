module.exports = (sequelize, Sequelize) =>{
    const User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING(50)
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        passwordcrypt: {
            type: Sequelize.STRING
        },
        avatar: {
            type: Sequelize.STRING(255)
        }
    });
    return User;
};