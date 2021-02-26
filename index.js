require("dotenv").config();
const express = require('express')
const port = 8000
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const path = require("path");

const { MONGO_USER, MONGO_PASS, MONGO_URI, MONGO_DB } = process.env;

let persoon = {
  voornaam: "Fabian", achternaam:"Vis", liked:[]
}

main();

function main() {
  mongoose
    .connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_URI}/${MONGO_DB}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => {
      const app = express();
      app.set("view engine", "ejs");
      app.set("views", path.join(__dirname, "views"));
      app.use(bodyParser.urlencoded({extended: true}))
      app.use(express.static('static'))
      

      app.get('/', (req, res) => {
        res.render('pages/home.ejs', {profiel:persoon})
      })
    
    
      app.get('/liked', (req, res) => {
          res.render('pages/liked.ejs', {profiel:persoon})
        })
    
      app.post('/liked', (req, res) => {
        if (typeof req.body.personen === "string") {
          persoon.liked.push(req.body.personen)
        }
        else {
          persoon.liked = persoon.liked.concat(req.body.personen)
        }
        res.redirect('/')
          
      })
    


      app.use(function (req, res, next) {
        res.status(404).send("Error 404")
      });
      
      
      app.listen(port, () => {
        console.log(`Server opgestart at http://localhost:${port}`)})
    });
}






