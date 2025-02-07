import { makeId } from './util.service.js'
import { loadFromStorage, saveToStorage } from './storage.service.js'
import { booksData } from '../assets/data/books.js'

const BOOK_KEY = 'bookDB'

_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter
}

function query(filterBy) {
  return storageService.query(BOOK_KEY).then((books) => {
    let filteredBooks = [...books]
    // console.log('filter: ', filter)
    if (filterBy.title) {
      const regExp = new RegExp(filterBy.title, 'i')
      filteredBooks = filteredBooks.filter((book) => regExp.test(book.title))
    }
    if (filterBy.listPrice) {
      filteredBooks = filteredBooks.filter((book) => book.listPrice.amount >= filterBy.listPrice)
    }

    // console.log('books: ', books)
    return filteredBooks
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

function getEmptyBook(id = '', title = 'xxx', listPrice = '000') {
  return { id, title, listPrice }
}

function getDefaultFilter() {
  return { title: '', listPrice: '' }
}

function _createBooks() {
  let books = loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = booksData.map((book, idx) =>_createBook(book,idx))
  }
  saveToStorage(BOOK_KEY, books)
}

function _createBook(book,idx){
  book.imgSrc = `../assets/img/${idx + 1}.jpg`
  return book
}



/*

function _createBook(bookTitle = 'xxx') {
  const book = getEmptyBook()
  book.id = makeId()
  book.title = bookTitle

  let book = {
    id: 'OXeMG8wNskc',
    title: 'metus hendrerit',
    description: 'placerat nisi sodales suscipit tellus',
    thumbnail: 'http://ca.org/books-photos/20.jpg',
    listPrice: {
      amount: 109,
      currencyCode: 'EUR',
      isOnSale: false
    }
  }

  return book
}

{
"id": "OXeMG8wNskc",
"title": "metus hendrerit",
"description": "placerat nisi sodales suscipit tellus",
"thumbnail": "http://ca.org/books-photos/20.jpg",
"listPrice": {
"amount": 109,
"currencyCode": "EUR",
"isOnSale": false
}
}



*/
