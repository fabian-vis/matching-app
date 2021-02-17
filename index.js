const express = require('express')
const app = express()
const port = 8000
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('static'))

app.set('view engine', 'ejs');
app.set('views', 'views')

 app.get('/', (req, res) => {
  res.render('pages/home.ejs', {profiel : {voornaam: "Fabian", achternaam:"Vis"}})
})


app.get('/liked', (req, res) => {
    res.render('pages/liked.ejs', {profiel : {voornaam: "Fabian", achternaam:"Vis"}})
  })

  app.get("/getemail", function (request, response){
    var firstname = request.query.firstname;

    if (firstname != "") {
        response.send("Your email address is " + firstname + "@gmail.com");
    } else {
        response.send("Please provide us first name");
    }
});

app.use(function (req, res, next) {
  res.status(404).send("Error 404")
});

app.listen(port, () => {
  console.log(`Server opgestart at http://localhost:${port}`)
})


