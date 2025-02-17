import { bookService } from '../services/book.service.js'
import { AddGoogleBook } from '../cmps/AddGoogleBook.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

const { get, getEmptyBook, save } = bookService

const { useState, useEffect } = React

const { useParams, useNavigate, Link } = ReactRouterDOM

// TODO make the data saved as regular in local storage

export function BookEdit() {
  // { bookId, onAdd, onUpdate, setIsEdit, setSelectedBookId }

  const [book, setBook] = useState(getEmptyBook())

  // console.log('book: ', book)

  const { bookId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    if (!bookId) return

    loadBook()
  }, [])

  function loadBook() {
    get(bookId).then((book) => {
      setBook(book)
    })
  }

  function onSubmit(ev) {
    ev.preventDefault()

    const msg = book.id ? 'Updated' : 'Added'

    save(book)
      .then(() => {
        showSuccessMsg(`The book is ${msg}`)
      })
      .catch((err) => {
        console.log(err)
        showErrorMsg(`The book didn't ${msg}`)
      })
      .finally(() => navigate('/book'))
  }

  function handleChange(ev) {
    let { type, name: field, value } = ev.target

    if (type === 'number') value = +value
    setBook((prevBook) => ({ ...prevBook, [field]: value }))
  }

  function handleChangeListPrice(ev) {
    const { type, name: prop } = ev.target
    let { value } = ev.target

    switch (type) {
      case 'range':
      case 'number':
        value = +value
        break

      case 'checkbox':
        value = ev.target.checked
        break
    }

    setBook((prevBook) => ({
      ...prevBook,
      listPrice: { ...prevBook.listPrice, [prop]: value }
    }))
  }

  GoogleBooksList
  if (!book) return 'Loading...'

  return (
    <section className="book-edit-container">
      <h1>{book.id ? 'Update' : 'Add'} a Book!</h1>

      {!bookId && <AddGoogleBook />}

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={book.title || ''}
            onChange={handleChange}
            placeholder="Enter the title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            value={book.price || ''}
            onChange={handleChange}
            placeholder="Enter the price"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="publishedDate">Year:</label>
          <input
            type="number"
            name="publishedDate"
            value={book.publishedDate || ''}
            onChange={handleChange}
            placeholder="Enter the year it was published"
          />
        </div>

        <div className="form-group">
          <label htmlFor="pageCount">Pages:</label>
          <input
            type="number"
            name="pageCount"
            value={book.pageCount || ''}
            onChange={handleChange}
            placeholder="Enter the number of pages"
          />
        </div>

        <div className="form-group checkbox">
          <label htmlFor="isOnSale">On sale:</label>

          <label htmlFor="isOnSale">
            Yes
            <input
              type="radio"
              name="isOnSale"
              value={true}
              onChange={handleChange}
              // onChange={handleChangeListPrice}
              placeholder="Enter the number of pages"
            />
          </label>
          <label htmlFor="isOnSale">
            No
            <input
              type="radio"
              name="isOnSale"
              value={false}
              onChange={handleChange}
              // onChange={handleChangeListPrice}
              placeholder="Enter the number of pages"
            />
          </label>
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => navigate('/book')}>
          Close
        </button>
      </form>
    </section>
  )
}
