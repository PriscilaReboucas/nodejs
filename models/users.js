module.exports = (sequelize,Sequelize) => {
    return sequelize.define('users',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name: Sequelize.STRING,
        password:Sequelize.STRING
    });
}