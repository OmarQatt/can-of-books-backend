'use strict';

const mongoose = require('mongoose');

function renderBook (req , res) {
    mongoose.connect(process.env.DATABASE_URL);

const newBook = new mongoose.Schema({
    title: String,
    description: String,
    status: String
})
const BooksModel = mongoose.model('BooksModel' , newBook)

const book1 = new BooksModel({
    title: 'Book 1',
    description: 'This is the first book',
    status: 'available'
})
const book2 = new BooksModel({
    title: 'Book 2',
    description: 'This is the second book',
    status: 'available'
})
const book3 = new BooksModel({
    title: 'Book 3',
    description: 'This is the third book',
    status: 'available'
})

book1.save();
book2.save();
book3.save();

}
module.exports = renderBook 