const express = require("express")
const app = express()
const connection = require("./database/database")

const CategoriesController = require("./categories/CategoriesController") 
const ArticlesController = require("./articles/ArticlesControllers")
const Artiche = require("./articles/Article")
const Category = require("./categories/Category")


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
    res.render("index")
})

app.listen(8080, ()=>{
    console.log("Servidor rodando")
})