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
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')
})


// const booksRouter = require('./module/Books');
// const { response } = require('express');
// booksRouter();



const BooksModel = require('./module/Books');
const { response } = require('express');
app.get('/books',(req , res) => {

  BooksModel.find({}, (err, books) => {
   if (err) res.status(500).json({ message: err.message });
   else res.send(books);
  })
})
app.post('/books', createBook);
app.delete('/books/:id', deleteBook);
app.put('/books/:id', updateBook);


app.listen(PORT, () => console.log(`listening on ${PORT}`));




function updateBook(req,res) {
  const {book} = req.body;
  const id = req.params.id;

  BooksModel.findByIdAndUpdate(id ,book, (err, sendRec) => {
    if (err) res.status(500).json({ message: err.message });
    else {
      res.send(sendRec)}
})

}

function deleteBook (req, res) {
  const id = req.params.id;
  console.log(id);
  BooksModel.findByIdAndDelete(id, (err, sendRec) => {
    if (err) res.status(500).json({ message: err.message });
    else {
      res.send(sendRec)}
})
}

function createBook(req , res ) {
  console.log(req.body);
  const {newBook} = req.body;
  const book = new BooksModel(newBook);
 book.save();
  res.status(201).send(book);
}



