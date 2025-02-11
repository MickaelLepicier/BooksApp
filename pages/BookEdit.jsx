import { bookService } from '../services/book.service.js'
const { get, getEmptyBook, save } = bookService

const { useState, useEffect } = React

const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookEdit() {
  // { bookId, onAdd, onUpdate, setIsEdit, setSelectedBookId }

  const [book, setBook] = useState(null)

  const { bookId } = useParams()

  const navigate = useNavigate()

  // const currFunc = bookId ? onUpdate : onAdd

  // TODO - FIX BUG ADD A BOOK
  // bookId = undefined...

  useEffect(() => {
    if (bookId) {
      get(bookId).then((book) => {
        setBook(book)
      })
    } else {
      setBook(getEmptyBook())
    }
  }, [])

  function onSubmit(ev) {
    ev.preventDefault()
    // currFunc(book)
    save(book)
      .then((savedBook) => {
        console.log('savedBook: ', savedBook)
        onClose()
        // navigate('/book')
      })
      .catch((err) => console.log(err))
  }

  function onClose() {
    // setIsEdit(false)
    // if (!bookId) return
    // setSelectedBookId(null)

    navigate('/book')
  }

  function updateBook(ev) {
    let { type, name: field, value } = ev.target

    if (type === 'number') value = +value
    setBook((prevBook) => ({ ...prevBook, [field]: value }))
  }

  if (!book) return 'Loading...'
  // title, listPrice, publishedDate, pageCount, isOnSale

  // TODO - FIX BUG ADD A BOOK
  return (
    <section className="book-edit-container">
      <h1>{book.id ? 'Update' : 'Add'} a Book!</h1>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={book.title || ''}
            onChange={updateBook}
            placeholder="Wright the title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            value={book.price || ''}
            onChange={updateBook}
            placeholder="Wright the price"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="publishedDate">Year:</label>
          <input
            type="number"
            name="publishedDate"
            value={book.publishedDate || ''}
            onChange={updateBook}
            placeholder="Wright the year it was published"
          />
        </div>

        <div className="form-group">
          <label htmlFor="pageCount">Pages:</label>
          <input
            type="number"
            name="pageCount"
            value={book.pageCount || ''}
            onChange={updateBook}
            placeholder="Wright the number of pages"
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
              onChange={updateBook}
              placeholder="Wright the number of pages"
            />
          </label>
          <label htmlFor="isOnSale">
            No
            <input
              type="radio"
              name="isOnSale"
              value={false}
              onChange={updateBook}
              placeholder="Wright the number of pages"
            />
          </label>
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </form>
    </section>
  )
}
