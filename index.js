const express = require("express")
const app = express()
const connection = require("./database/database")

const CategoriesController = require("./categories/CategoriesController") 
const ArticlesController = require("./articles/ArticlesControllers")
const Artiche = require("./articles/Article")
const Category = require("./categories/Category")
const Article = require("./articles/Article")


// View engine

app.set('view engine', 'ejs')

app.use (express.static('public'))


app.use(express.urlencoded({ extended: true }));


//Database

connection.authenticate()
.then(()=>{
    console.log("Conectado ao banco!")
}).catch((err)=>{
    console.log("Erro ao se conectar com o banco" + err)
})

app.use("/",CategoriesController);
app.use("/",ArticlesController);

app.get("/", (req, res) =>{

    Article.findAll({
        order:[
            ['id', 'DESC']
        ]
    }).then(articles =>{

        Category.findAll().then(categories =>{
            res.render("index", {articles: articles, categories: categories})
        })

    })
})

app.get("/:slug", (req, res)=>{
    let slug = req.params.slug
    Article.findOne({
        where:{
            slug: slug
        }
    }).then(article =>{
        if(article != undefined){
            Category.findAll().then(categories =>{
                res.render("article", {article: article, categories: categories})
            })
        }else{
            res.redirect("/")
        }
    }).catch(err =>{
        res.redirect("/")

    })
})

app.get("/category/:slug", (req, res)=>{
    let slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model : Article}]
    }).then(category =>{
        if(category != undefined){

            Category.findAll().then(categories =>{
                res.render("index",{articles: category.articles, categories: categories})
            })

        }else{
            res.redirect("/")
        }
    }).catch((err)=>{
        res.redirect("/")
    })
})

app.listen(8080, ()=>{
    console.log("Servidor rodando")
})