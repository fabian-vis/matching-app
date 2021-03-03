require("dotenv").config();
const express = require('express')
const port = 8000
const bodyParser = require("body-parser")
const MongoClient = require('mongodb').MongoClient
const path = require("path");

const { MONGO_USER, MONGO_PASS, MONGO_URI, MONGO_DB } = process.env;

let persoon = {
  voornaam: "Fabian", achternaam:"Vis", liked:[]
}

main();

function main() {
  MongoClient
    .connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_URI}/${MONGO_DB}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => {
      const app = express()

      const db = connection.db('projecttech')
      const personenCollection = db.collection('personen')

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

      app.get('/liked', (req, res) => {
        db.collection('personen').find().toArray()
          .then(results => {
            res.render('pages/liked.ejs', {persoon: results})
          })
          .catch(/* ... */)
      })
    
     
    
      app.post('/liked', (req, res) => {
        personenCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.get('/', (req, res) => {
      db.collection('personen').find().toArray()
        .then(results => {
          console.log(results)
        })
        .catch(error => console.error(error))
      // ...
    })
    

      app.use(function (req, res, next) {
        res.status(404).send("Error 404")
      });
      
      
      app.listen(port, () => {
        console.log(`Server opgestart at http://localhost:${port}`)})
    });
}






