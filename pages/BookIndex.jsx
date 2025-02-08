import { BookDetails } from '../cmps/BookDetails.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { BooksFilter } from '../cmps/BooksFilter.jsx'
import { EditBook } from '../cmps/EditBook.jsx'
import { bookService } from '../services/book.service.js'
import { makeId } from '../services/util.service.js'

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

  function onAdd(ev, title, listPrice, publishedDate, pageCount) {
    ev.preventDefault()

    let newBook = bookService.getEmptyBook()
    newBook.id = makeId()
    console.log('newBook: ', newBook)
    console.log('title: ',title);
    // console.log('title,listPrice,publishedDate,pageCount: ', title, listPrice, publishedDate, pageCount)
  
  }

  function onUpdate(ev,bookId) {
    ev.preventDefault()
    // const updatedBook
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

  // <AddBook/>
  // <EditBook/>
  return (
    <section>

      {/* Update a Book */}
      {isEdit && selectedBookId && <EditBook bookId={selectedBookId} onUpdate={onUpdate} />}

      {/* Add a Book  */}
      {isEdit && <EditBook  onAdd={onAdd} />}

      {!isEdit && selectedBookId && <BookDetails bookId={selectedBookId} setSelectedBookId={setSelectedBookId} />}

      {!isEdit && !selectedBookId && (
        <section>
          <BooksFilter filterBy={filterBy} setFilterBy={setFilterBy} />
          <button onClick={()=>setIsEdit(true)}>Add Book</button>
          <BookList books={books} setSelectedBookId={setSelectedBookId} onDelete={onDelete} />
        </section>
      )}
    </section>
  )
}
