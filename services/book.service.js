import { loadFromStorage, saveToStorage } from './storage.service.js'
import { booksData } from '../assets/data/books.js'
import { makeId, makeLorem, getRandomIntInclusive } from './util.service.js'
// import axios from 'axios'

const BOOK_KEY = 'bookDB'

const CACHE_STORAGE_KEY = 'googleBooksCache'
const gCache = loadFromStorage(CACHE_STORAGE_KEY) || {}

_createBooks()

export const bookService = {
  query,
  get,
  post,
  put,
  remove,
  save,
  getGoogleBooks,
  addGoogleBook,
  getEmptyBook,
  getDefaultFilter,
  getFilterFromSearchParams,
  getCategories
}

window.bs = bookService

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

    if (filterBy.amount) {
      filteredBooks = filteredBooks.filter(
        (book) => book.listPrice.amount >= filterBy.amount
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
  return storageService.get(BOOK_KEY, bookId).then(_setNextPrevBookId)
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

function addGoogleBook(book) {
  return storageService.post(BOOK_KEY, book, false)
}

function getGoogleBooks(bookName) {
  if (bookName === '') return Promise.resolve()
  const googleBooks = gCache[bookName]

  if (googleBooks) {
    console.log('data from storage...: ', googleBooks)
    return Promise.resolve(googleBooks)
  }

  const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookName}`
  return axios.get(url).then((res) => {
    const data = res.data.items
    console.log('data from network... ', data)
    const books = _formatGoogleBooks(data)
    saveToStorage(CACHE_STORAGE_KEY, gCache)
    return books
  })
}

function _formatGoogleBooks(googleBooks) {
  return googleBooks.map((googleBook) => {
    const { volumeInfo } = googleBook
    const book = {
      id: googleBook.id,
      title: volumeInfo.title,
      description: volumeInfo.description,
      pageCount: volumeInfo.pageCount,
      authors: volumeInfo.authors,
      categories: volumeInfo.categories,
      publishedDate: volumeInfo.publishedDate,
      language: volumeInfo.language,
      listPrice: {
        amount: utilService.getRandomIntInclusive(80, 500),
        currencyCode: 'EUR',
        isOnSale: Math.random() > 0.7
      },
      reviews: []
    }
    if (volumeInfo.imageLinks) book.thumbnail = volumeInfo.imageLinks.thumbnail
    return book
  })
}

// function getEmptyBook(
//   id = '',
//   title = '',
//   listPrice = '',
//   publishedDate = '',
//   pageCount = '',
//   currencyCode = '$'
// ) {

//   return { id, title, listPrice, publishedDate, pageCount, currencyCode }
// }

function getEmptyBook(
  title = '',
  amount = '',
  description = '',
  pageCount = '',
  language = 'en',
  authors = ''
) {
  return {
    title,
    authors,
    description,
    pageCount,
    thumbnail: `/assets/img/15.jpg`,
    language,
    listPrice: {
      amount,
      currencyCode: 'EUR',
      isOnSale: Math.random() > 0.7
    },
    reviews: []
  }
}

function getDefaultFilter() {
  return { title: '', amount: '', publishedDate: '', pageCount: '' }
}

function getFilterFromSearchParams(searchParams) {
  const title = searchParams.get('title') || ''
  const amount = +searchParams.get('amount') || ''
  const publishedDate = +searchParams.get('publishedDate') || ''
  const pageCount = +searchParams.get('pageCount') || ''

  return { title, amount, publishedDate, pageCount }
}

function getCategories() {
 return query(BOOK_KEY).then((books) => {
    const bookCountByCategories = _getBookCountByCategories(books)

    const data = Object.keys(bookCountByCategories).map((category) => ({
      title: category,
      value: Math.round((bookCountByCategories[category] / books.length) * 100)
    }))
    console.log('data: ', data)
    return data
  })
}

function _getBookCountByCategories(books) {
  const bookCountByCategories = books.reduce((map, book) => {
    const category = book.categories[0]
    if (!map[category]) map[category] = 0
    map[category]++
    return map
    // console.log('book.categories: ',book.categories[0])
  }, {})
  return bookCountByCategories
}

function _createBooks() {
  const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
  const crncy = ['EUR', 'USD', 'ILS']
  const books = loadFromStorage(BOOK_KEY) || []

  if (books && books.length) return

  for (let i = 0; i < 20; i++) {
    const book = {
      id: makeId(),
      title: makeLorem(2),
      subtitle: makeLorem(4),
      authors: [makeLorem(1)],
      publishedDate: getRandomIntInclusive(1950, 2024),
      description: makeLorem(20),
      pageCount: getRandomIntInclusive(20, 600),
      categories: [ctgs[getRandomIntInclusive(0, ctgs.length - 1)]],
      thumbnail: `/assets/img/${i + 1}.jpg`,
      language: 'en',
      listPrice: {
        amount: getRandomIntInclusive(80, 500),
        currencyCode: [crncy[getRandomIntInclusive(0, crncy.length - 1)]],
        isOnSale: Math.random() > 0.7
      },
      reviews: []
    }
    books.push(book)
  }
  saveToStorage(BOOK_KEY, books)
}

// function _createBooks() {
//   let books = loadFromStorage(BOOK_KEY)
//   if (!books || !books.length) {
//     books = booksData.map((book, idx) => _createBook(book, idx))
//   }
//   saveToStorage(BOOK_KEY, books)
// }

// function _createBook(book, idx) {
//   // console.log('book: ', book.authors.join(', '))
//   let newBook = {
//     id: book.id,
//     title: book.title,
//     price: book.listPrice.amount,
//     authors: book.authors.join(', '),
//     language: book.language,
//     description: book.description,
//     reviews: [],
//     publishedDate: book.publishedDate,
//     pageCount: book.pageCount,
//     isOnSale: book.listPrice.isOnSale,
//     currencyCode: book.listPrice.currencyCode,
//     thumbnail: book.thumbnail,
//     imgSrc: `../assets/img/${idx + 1}.jpg`
//   }
//   // console.log('newBook: ',newBook);

//   return newBook
// }

function _setNextPrevBookId(book) {
  return storageService.query(BOOK_KEY).then((books) => {
    const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
    const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
    const prevBook = books[bookIdx - 1]
      ? books[bookIdx - 1]
      : books[books.length - 1]
    book.nextBookId = nextBook.id
    book.prevBookId = prevBook.id
    return book
  })
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
