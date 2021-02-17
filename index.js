const express = require('express')
const app = express()
const port = 8000

app.use(express.static('static'))

app.set('view engine', 'ejs');
app.set('views', 'views')

app.get('/', (req, res) => {
  res.render('pages/home.ejs', {profiel : {voornaam: "Fabian", achternaam:"Vis"}})
})

  app.get('/liked', (req, res) => {
    res.render('pages/liked.ejs', {profiel : {voornaam: "Fabian", achternaam:"Vis"}})
  })

app.use(function (req, res, next) {
  res.status(404).send("Error 404")
});

app.listen(port, () => {
  console.log(`Server opgestart at http://localhost:${port}`)
})


