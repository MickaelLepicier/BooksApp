import { BookDetails } from './BookDetails.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { BooksFilter } from '../cmps/BooksFilter.jsx'
import { BookEdit } from './BookEdit.jsx'
import { bookService } from '../services/book.service.js'

const { useState, useEffect, useRef } = React

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

  if (!books) return 'Loading...'
  // console.log('books: ', books)

  // console.log('isEdit: ',isEdit);
  // console.log('selectedBookId: ',selectedBookId);
  return (
    <section className='book-index-container'>
      {/* Update a Book */}
      {isEdit && selectedBookId && (
        <BookEdit
          bookId={selectedBookId}
          onUpdate={onUpdate}
          setIsEdit={setIsEdit}
          setSelectedBookId={setSelectedBookId}
        />
      )}

      {/* Add a Book */}
      {isEdit && !selectedBookId && (
        <BookEdit onAdd={onAdd} setIsEdit={setIsEdit} />
      )}

      {!isEdit && selectedBookId && (
        <BookDetails
          bookId={selectedBookId}
          setSelectedBookId={setSelectedBookId}
          setIsEdit={setIsEdit}
        />
      )}

      {!isEdit && !selectedBookId && (
        <section>
          <BooksFilter filterBy={filterBy} setFilterBy={setFilterBy} />
          <button className='btn-add' onClick={() => setIsEdit(true)}>Add Book</button>
          <BookList
            books={books}
            setSelectedBookId={setSelectedBookId}
            onDelete={onDelete}
          />
        </section>
      )}
    </section>
  )
}
