require("dotenv").config();
const express = require('express')
const port = 8000
const bodyParser = require("body-parser")
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
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
        db.collection('personen').find().toArray()
        .then(results => {
          res.render('pages/liked.ejs', {
            personen: results,
            profiel: persoon,
          })
        })
      })
    
     
    // als er op de submit button word geklikt worden de geselecteerde personen naar de database gestuurd.
      app.post('/liked', (req, res) => {
        let likes;
        if (typeof req.body.personen === "string") {
          likes = [req.body.personen]
        }
        else {
          likes = req.body.personen
        }
        const promises = likes.map( like => {
          return personenCollection.insertOne({persoon:like})
        })
        Promise.all(promises) 
          .then(results => {
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

    app.delete('/delete', (req, res) => {
      // Maakt van de query string een officeel mongodb object id, anders verwijdert mongodb de persoon niet
      db.collection('personen').deleteOne({"_id":new ObjectID(req.query.id)})
      .then((result) => {
        console.log(result)
        res.send('Gelukt')
      })
    })

    

      app.use(function (req, res, next) {
        res.status(404).send("Error 404")
      });
      
      
      app.listen(port, () => {
        console.log(`Server opgestart at http://localhost:${port}`)})
    });
}






