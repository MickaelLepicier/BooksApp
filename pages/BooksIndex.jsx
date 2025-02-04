//
//

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

  const [books, setBooks] = useState([])

  useEffect(() => {
    // loadBooks()
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
      <h1>Books</h1>
      {books.map((book) => {
        console.log('book: ', book)
        return (
          <section>
            <h2>{book.title}</h2>
            <p>{book.listPrice}</p>
          </section>
        )
      })}
    </section>
  )
}
