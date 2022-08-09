'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const app = express();

// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
// const db = mongoose.connection
// db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('Connected To Database'))

app.use(cors());
const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')
})


const booksRouter = require('./module/Books');
const { response } = require('express');
booksRouter();


const book = mongoose.model('BooksModel')
app.get('/books',(req , res) => {

  book.find({}, (err, books) => {
   if (err) res.status(500).json({ message: err.message });
   else res.send(books);
  })
})


app.listen(PORT, () => console.log(`listening on ${PORT}`));
