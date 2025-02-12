import { loadFromStorage, saveToStorage } from './storage.service.js'
import { booksData } from '../assets/data/books.js'

export const bookService = {
  query,
  get,
  post,
  put,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter
}

window.bs = bookService

const BOOK_KEY = 'bookDB'

_createBooks()

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (!books || !books.length) {
      books = booksData
      saveToStorage(BOOK_KEY, books)
    }

    let filteredBooks = [...books]

    // console.log('filter: ', filter)
    if (filterBy.title) {
      const regExp = new RegExp(filterBy.title, 'i')
      filteredBooks = filteredBooks.filter((book) => regExp.test(book.title))
    }

    if (filterBy.price) {
      filteredBooks = filteredBooks.filter(
        (book) => book.price >= filterBy.price
      )
    }

    if (filterBy.publishedDate) {
      filteredBooks = filteredBooks.filter(
        (book) => book.publishedDate >= filterBy.publishedDate
      )
    }

    if (filterBy.pageCount) {
      filteredBooks = filteredBooks.filter(
        (book) => book.pageCount >= filterBy.pageCount
      )
    }
    return filteredBooks
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId)
}

function post(newEntity) {
  return storageService.post(BOOK_KEY, newEntity)
}

function put(updatedEntity) {
  return storageService.put(BOOK_KEY, updatedEntity)
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

function getEmptyBook(
  id = '',
  title = '',
  listPrice = '',
  publishedDate = '',
  pageCount = '',
  currencyCode = '$'
) {
  return { id, title, listPrice, publishedDate, pageCount, currencyCode }
}

function getDefaultFilter() {
  return { title: '', listPrice: '', publishedDate: '', pageCount: '' }
}

function _createBooks() {
  let books = loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = booksData.map((book, idx) => _createBook(book, idx))
  }
  saveToStorage(BOOK_KEY, books)
}

function _createBook(book, idx) {
  // console.log('book: ', book.authors.join(', '))
  let newBook = {
    id: book.id,
    title: book.title,
    price: book.listPrice.amount,
    authors: book.authors.join(', '),
    language: book.language,
    description: book.description,
    reviews: [],
    publishedDate: book.publishedDate,
    pageCount: book.pageCount,
    isOnSale: book.listPrice.isOnSale,
    currencyCode: book.listPrice.currencyCode,
    thumbnail: book.thumbnail,
    imgSrc: `../assets/img/${idx + 1}.jpg`
  }
  // console.log('newBook: ',newBook);

  return newBook
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
