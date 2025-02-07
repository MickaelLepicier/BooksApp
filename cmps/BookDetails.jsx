import { bookService } from '../services/book.service.js'

const { useState, useEffect } = React

export function BookDetails({ bookId, setSelectedBookId }) {
  const [book, setBook] = useState(null)

  useEffect(() => {
    loadBook()
  }, [])

  function loadBook() {
    bookService
      .get(bookId)
      .then((book) => setBook(book))
      .catch((err) => console.error(`Did not find the book: ${err}`))
  }

  //TODO make the CSS of BookDetails

  if (!book) return 'Loading...'
  //   console.log('book: ', book)

  const { id, title, imgSrc, pageCount, language, description, listPrice } = book
  const { amount, currencyCode, isOnSale } = listPrice

  // TODOs:
  // add on the img "onSale" if isOnSale === true
  return (
    <section className="book-details-container">
      <img src={imgSrc} alt="book-image" />

      <section className="book-content">
        <h2><span>Title:</span> {title}</h2>
        <p><span>Language:</span> {language}</p>
        <p><span>Pages:</span> {pageCount}</p>
        <p><span>Price:</span> {amount}$</p>
        <p><span>Description:</span> {description}</p>

        <section className="btns-details">
          <button onClick={() => setSelectedBookId(null)}>Edit</button>
          <button onClick={() => setSelectedBookId(null)}>Close</button>
        </section>
      </section>
    </section>
  )
}
