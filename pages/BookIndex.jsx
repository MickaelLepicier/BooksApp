import { BookDetails } from './BookDetails.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { BooksFilter } from '../cmps/BooksFilter.jsx'
import { BookEdit } from './BookEdit.jsx'
import { bookService } from '../services/book.service.js'

const { useState, useEffect } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
  const [selectedBookId, setSelectedBookId] = useState(null)
  const [isEdit, setIsEdit] = useState(false)

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

  function onAdd(newBook) {
    newBook.imgSrc = '../assets/img/1.jpg'
    // newBook.thumbnail = '../assets/img/1.jpg'

    bookService
      .post(newBook)
      .then(() => {
        console.log('Book is saved')
      })
      .catch((err) => console.log(`The book did not Added: ${err}`))
  }

  function onUpdate(book) {
    bookService
      .put(book)
      .then(() => console.log('Book is updated'))
      .catch((err) => console.log(`The book did not Updated: ${err}`))
  }

  function onDelete(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        console.log('Book has been Deleted')
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId))
      })
      .catch((err) => console.log('Book has not been Deleted:', err))
  }

  if (!books) return <div>Loading...</div>

  return (
    <section className="book-index-container">
      {isEdit && (
        <section>
          
          {/* Update a Book */}
          {selectedBookId && (
            <BookEdit
              bookId={selectedBookId}
              onUpdate={onUpdate}
              setIsEdit={setIsEdit}
              setSelectedBookId={setSelectedBookId}
            />
          )}

          {/* Add a Book */}
          {!selectedBookId && <BookEdit onAdd={onAdd} setIsEdit={setIsEdit} />}
        </section>
      )}

      {!isEdit && (
        <section>
          {selectedBookId && (
            <BookDetails
              bookId={selectedBookId}
              setSelectedBookId={setSelectedBookId}
              setIsEdit={setIsEdit}
            />
          )}

          {!selectedBookId && (
            <section>
              <BooksFilter filterBy={filterBy} setFilterBy={setFilterBy} />

              <button className="btn-add" onClick={() => setIsEdit(true)}>
                Add Book
              </button>

              <BookList
                books={books}
                setSelectedBookId={setSelectedBookId}
                onDelete={onDelete}
              />
              {!books.length && <div>No books found</div>}
            </section>
          )}
        </section>
      )}
    </section>
  )
}
