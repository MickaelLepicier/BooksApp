//
//

import { BooksList } from '../cmps/BooksList.jsx'
import { booksService } from '../services/booksService.js'

const { useState, useEffect, useRef } = React

export function BooksIndex() {
  // TODOs:
  // get data from storage
  // add it on the state

  //   const obj = {
  //     id: 'OXeMG8wNskc',
  //     title: 'metus hendrerit',
  //     description: 'placerat nisi sodales suscipit tellus',
  //     thumbnail: 'http://ca.org/books-photos/20.jpg',
  //     listPrice: {
  //       amount: 109,
  //       currencyCode: 'EUR',
  //       isOnSale: false
  //     }
  //   }

  const [books, setBooks] = useState(null)
  console.log(books)

  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks() {
    booksService.query().then((books) => {
      setBooks(books)
    })
  }
  // console.log('books: ', books)
  if (!books) return 'Loading...'
  return (
    <section>
      <BooksList books={books} />
    </section>
  )
}
