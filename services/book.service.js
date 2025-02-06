import { makeId } from './util.service.js'
import { loadFromStorage, saveToStorage } from './storage.service.js'

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
      filteredBooks = filteredBooks.filter(book => regExp.test(book.title))
  }
  if (filterBy.listPrice) {
    filteredBooks = filteredBooks.filter(book => book.speed >= filterBy.listPrice)
  }

    /*
            Another way: (not a very good one)

    if (filter.title)
      books = books.filter((book) => {
        const filterTitle = filter.title.toLowerCase()
        const bookTitle = book.title.toLowerCase()
        return bookTitle.includes(filterTitle)
      })

    if (filter.listPrice) {
      books = books.filter((book) => {
        return +book.listPrice > filter.listPrice
      })
    }

      */
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
    books = [_createBook(), _createBook('yyy'), _createBook('zzz')]
  }
  saveToStorage(BOOK_KEY, books)
}

function _createBook(bookTitle = 'xxx') {
  const book = getEmptyBook()
  book.id = makeId()
  book.title = bookTitle
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
