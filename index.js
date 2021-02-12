const express = require('express')
const app = express()
const port = 8000

app.use(express.static('static'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
    res.send('testpagina')
  })

app.get('*', (req, res) => {
  res.send('error 404');
});

app.listen(port, () => {
  console.log(`Server opgestart at http://localhost:${port}`)
})
