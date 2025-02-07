//
//

import { BookDetails } from '../cmps/BookDetails.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { BooksFilter } from '../cmps/BooksFilter.jsx'
import { bookService } from '../services/book.service.js'

const { useState, useEffect, useRef } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)

  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  const [selectedBookId, setSelectedBookId] = useState(null)

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService
      .query(filterBy)
      .then((books) => {
        setBooks(books)
      })
      .catch((err) => console.error('Could not get the Books Data: ', err))
  }

  // console.log('books: ', books)
  if (!books) return 'Loading...'

  // <React.Fragment>
  return (
    <section>
      {selectedBookId && <BookDetails bookId={selectedBookId} setSelectedBookId={setSelectedBookId} />}

      {!selectedBookId && (
        <section>
          <BooksFilter filterBy={filterBy} setFilterBy={setFilterBy} />
          <button>Add Book</button>
          <BookList books={books} setSelectedBookId={setSelectedBookId} />
        </section>
      )}
    </section>
  )
}
