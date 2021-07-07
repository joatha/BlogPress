const Sequelize = require('sequelize')

 //Conexao com o banco de dados
 const connection = new Sequelize('blogpress', 'root', 'joatha', {

    host: "localhost",
    dialect:'mysql',
    timezone:"-03:00"
})

module.exports = connection