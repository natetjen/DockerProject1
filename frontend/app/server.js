const express = require('express')
const path = require('path');
const axios = require('axios');

app = express()

let PORT = 3000
let storage = [];
app.use(express.json());
app.use(express.static(path.join(`${__dirname}/dist`)));
app.post('/submit', (req, res) => {
  console.log(req.body)
  storage.push(req.body)
  res.json(storage)
  res.end()
})

app.get('/everything', (req, res) => {
  res.json(storage)
  res.end()
})

app.listen(PORT)
// app.connect(console.log('connected'))