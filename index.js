require('dotenv').config();
const express = require('express')
const port = process.env.PORT||8000
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const path = require('path');

// Hier wordt alles uit mijn .env bestand gehaald zodat het later gebruikt kan worden.
const { MONGO_USER, MONGO_PASS, MONGO_URI, MONGO_DB } = process.env;

// Persoon array met profiel.voornaam en profiel.achternaam die in op de website worden weergegeven.
let persoon = {
  voornaam: 'Fabian', achternaam:'Vis', liked:[]
}

// Hier wordt de functie main aangeroepen
main();

// Hier wordt de database connectie gemaakt
function main() {
  MongoClient
  // Hier wordt de URL gemaakt die MongoDB nodig heeft (met de gevoelige data uit de .env)
    .connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_URI}/${MONGO_DB}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    // Then is een promise, als de connectie er is wordt alles eronder uitgevoerd
    .then((connection) => {
      const app = express()
    
      // projecttech is de naam van mijn MongoDB database en personen is de naam van mijn collection
      const db = connection.db('projecttech')
      const personenCollection = db.collection('personen')

      // Hier wordt mijn templating engine aangeroepen + bodyparser
      app.set('view engine', 'ejs');
      app.set('views', path.join(__dirname, 'views'));
      app.use(bodyParser.urlencoded({extended: true}))
      app.use(express.static('static'))
  
      app.get('/', (req, res) => {
        res.render('pages/home.ejs', {profiel:persoon})
      })

      // Hier wordt alles uit de database gehaald zodat het op de /liked pagina weergegeven kan worden.
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
        // wanneer req.body.personen een string is wordt het in een array gezet
        if (typeof req.body.personen === 'string') {
          likes = [req.body.personen]
        }
        // wanneer het wel een array is.
        else {
          likes = req.body.personen
        }
        // van de array met gelikete personen wordt een array met promises gemaakt
        const promises = likes.map( like => {
          // hier wordt alles in de database gezet.
          return personenCollection.insertOne({persoon:like})
        })
        // wanneer alle inserts klaar zijn wordt de gebruiker geredirect naar de liked pagina
        Promise.all(promises) 
          .then(results => {
              res.redirect('/liked')
            })
            .catch(error => console.error(error))
    })

    app.delete('/delete', (req, res) => {
      // Maakt van de query string een officeel mongodb object id, anders verwijdert mongodb de persoon niet
      db.collection('personen').deleteOne({'_id':new ObjectID(req.query.id)})
      // wanneer het gelukt is om de data te verwijderen wordt er gelukt gesend die gebruikt wordt in de js functie
      .then((result) => {
        console.log(result)
        res.send('Gelukt')
      })
    })

    // wanneer er een error is krijg je een error 404
    app.use(function (req, res, next) {
      res.status(404).send('Error 404')
    });
    
    // Wanneer de server is opgestart krijg je localhost:8000 te zien in de terminal
    app.listen(port, () => {
      console.log(`Server opgestart at http://localhost:${port}`)})
    });
}






