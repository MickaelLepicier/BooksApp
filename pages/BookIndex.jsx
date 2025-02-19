import { BookList } from '../cmps/BookList.jsx'
import { BooksFilter } from '../cmps/BooksFilter.jsx'
import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React

const { useNavigate, Link, useSearchParams } = ReactRouterDOM

export function BookIndex() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(
    bookService.getFilterFromSearchParams(searchParams)
  )

  const navigate = useNavigate()

  useEffect(() => {
    setSearchParams(filterBy)
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService
      .query(filterBy)
      .then(setBooks)
      .catch((err) => console.error('Could not get the Books Data: ', err))
  }

  function onSetFilter(filterByToEdit) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterByToEdit }))
  }

  function onRemove(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId))
        showSuccessMsg('Book has been Deleted')
      })
      .catch((err) => {
        console.log(err)
        showErrorMsg('Book has not been Deleted')
        navigate('/book')
      })
  }

  if (!books) return <div>Loading...</div>

  return (
    <section className="book-index-container">
      <BooksFilter filterBy={filterBy} onSetFilter={onSetFilter} />

      <Link to="/book/edit">
        <button className="btn-add">Add Book</button>
      </Link>

      <BookList books={books} onRemove={onRemove} />

      {!books.length && <div>No books found</div>}
    </section>
  )
}
