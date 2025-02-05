//
//

import { BookList } from '../cmps/BookList.jsx'
import { BooksFilter } from '../cmps/BooksFilter.jsx'
import { bookService } from '../services/book.service.js'

const { useState, useEffect, useRef } = React



export function BookIndex() {
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
  // console.log(books)

  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
  // console.log('filterBy: ', filterBy)

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService.query(filterBy).then((books) => {
      setBooks(books)
    })
  }

  // console.log('books: ', books)
  if (!books) return 'Loading...'

// TODOs:
// create filter tab
// put filter in the query in the bookService



  return (
    <section>
      <BooksFilter filterBy={filterBy} setFilterBy={setFilterBy}/>
      <BookList books={books} />
    </section>
  )
}
