import { makeId } from './util.service.js'
import { loadFromStorage, saveToStorage } from './storage.service.js'

const BOOK_KEY = 'bookDB'

_createBooks()

export const booksService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter
}

function query() {
  return storageService.query(BOOK_KEY).then((books) => {
    //if()

    return books
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

function getEmptyBook(title = 'xxx', listPrice = '000') {
  return { title, listPrice }
}

function getDefaultFilter() {
  return { vendor: '', speed: '' }
}

function _createBooks() {
  let books = loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = [_createBook(), _createBook(), _createBook()]
  }
  saveToStorage(BOOK_KEY, books)
}

function _createBook() {
  const book = getEmptyBook()
  book.id = makeId()
  return book
}

/*

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
