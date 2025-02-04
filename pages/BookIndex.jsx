//
//

import { booksService } from '../services/booksService.js'

const { useState, useEffect, useRef } = React

export function BookIndex() {
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

  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks() {
    booksService.query().then((books) => {
      setBooks(books)
    })
  }
  console.log('books: ', books)

  return (
    <section>
      <h1>Books</h1>
    </section>
  )
}
