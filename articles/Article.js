const Sequelize = require("sequelize")
const connection = require("../database/database")
const Category = require("../categories/Category") // tenho que importar o modulo com qual quero me relacionar



const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull:false
    }
})

//Definindo relacionamentos no Sequelize


Category.hasMany(Article) // hasMany(tem muitos), uma categoria tem muitos artigos. 1 para muitos.
Article.belongsTo(Category) // Um artigo pertence a uma categoria, belongsTo é a forma de representar um relacionamento 1 para 1 no sequelize.

//Article.sync({force: true})
module.exports = Article;