import { bookService } from '../services/book.service.js'
import { GoogleBooksList } from './GoogleBooksList.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { debounce } from '../services/util.service.js'

const { useState, useRef, useEffect } = React
const { useNavigate } = ReactRouter

export function AddGoogleBook() {
  const [search, setSearch] = useState('')
  const [googleBooksList, setGoogleBooksList] = useState([])

  const navigate = useNavigate()
  const searchBooksDebounce = useRef(debounce(searchBooks, 1500))

  useEffect(() => {
    searchBooksDebounce.current(search)
    console.log('search: ',search)
  }, [])

  function handleSearch({ target }) {
    setSearch(target.value)
  }

  function searchBooks(search) {
    bookService
      .getGoogleBooks(search)
      .then((books) => setGoogleBooksList(books))
  }

  function onSubmit(ev) {
    ev.preventDefault()
    searchBooks(search)
  }

  function onSave(book) {
    bookService
      .addGoogleBook(book)
      .then(() => showSuccessMsg('Book has successfully saved!'))
      .catch(() => showErrorMsg(`couldn't save book`))
      .finally(() => navigate('/book'))
  }

  return (
    <section className="book-search">
      <div className="add-book-title">
        <form onSubmit={onSubmit}>
          <label htmlFor="add-book" className="bold-txt">
            Google Search:
          </label>
          <input
            type="text"
            name="title"
            value={search}
            onChange={handleSearch}
            placeholder="Insert book name"
            // id="add-book"
            className="add-book"
          />
          <button>Search</button>
        </form>
      </div>
      {googleBooksList && <GoogleBooksList booksList={googleBooksList} onSave={onSave}/>}
    </section>
  )
}
