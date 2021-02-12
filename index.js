const express = require('express')
const app = express()
const port = 8000

app.use(express.static('static'))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('pages/home.ejs')
})

app.get('/home', (req, res) => {
    res.render('pages/home.ejs')
  })

app.get('*', (req, res) => {
  res.render('error 404');
});

app.listen(port, () => {
  console.log(`Server opgestart at http://localhost:${port}`)
})


