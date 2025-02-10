import { bookService } from '../services/book.service.js'
import { LongText } from '../cmps/LongText.jsx'
import { getCurrencySymbol } from '../services/util.service.js'

const { useState, useEffect, useRef } = React

const {useParams, useNavigation,Link } = ReactRouterDom

export function BookDetails({ bookId, setSelectedBookId, setIsEdit }) {
  const [book, setBook] = useState(null)

const params = useParams() // the bookId is inside this hook

  const imgRef = useRef()
  const ribbonRef = useRef()
  const priceRef = useRef()

  useEffect(() => {
    loadBook()
  }, [params.bookId])

  useEffect(() => {
    if (book && priceRef.current) {
      priceRef.current.style.color = price > 150 ? 'red' : 'green'
      ribbonRef.current.hidden = isOnSale ? false : true
    }
  }, [book])

  function loadBook() {
    bookService
      .get(params.bookId)
      .then((book) => setBook(book))
      .catch((err) => console.error(`Did not find the book: ${err}`))
  }

  function getPageCountMsg(pageCount) {
    if (!pageCount) return ''

    let msg = 'Light Reading'
    if (pageCount > 500) msg = 'Serious Reading'
    else if (pageCount > 200) msg = 'Descent Reading'
    // else if(pageCount < 100) msg = 'Light Reading'
    return `(${msg})`
  }

  function getPublishedDateMsg(publishedDate) {
    if (!publishedDate) return ''

    const date = new Date()
    const currYear = date.getFullYear()
    const diff = currYear - publishedDate

    return diff >= 10 ? '(Vintage)' : '(New)'
  }

  function getLanguage(lng) {
    switch (lng) {
      case 'he':
        return 'Hebrew'

      case 'sp':
        return 'Spanish'

      default:
        return 'English'
    }
  }

  if (!book) return 'Loading...'
  // console.log('book: ', book)

  const {
    title,
    price,
    currencyCode,
    language,
    pageCount,
    publishedDate,
    description,
    isOnSale,
    thumbnail,
    imgSrc
  } = book

  const pageCountMsg = getPageCountMsg(pageCount)
  const publishedDateMsg = getPublishedDateMsg(publishedDate)
  const currencySymbol = getCurrencySymbol(currencyCode)
  const bookLanguage = getLanguage(language)

  // TODO later on create more comps for shorter code

  return (
    <section className="book-details-container">
      <section className="book-img-wrapper">
        <img ref={imgRef} src={thumbnail || imgSrc} alt="book-image" />
        <div className="ribbon" ref={ribbonRef} hidden>
          <span>On Sale!</span>
        </div>
      </section>

      <section className="book-info">
        <h2>
          <span>Title:</span> {title}
        </h2>
        {publishedDate && (
          <p>
            <span>Published Date: </span>
            {publishedDate} {publishedDateMsg}
          </p>
        )}
        {language && (
          <p>
            <span>Language: </span> {bookLanguage}
          </p>
        )}
        {pageCount && (
          <p>
            <span>Pages:</span> {pageCount} {pageCountMsg}
          </p>
        )}
        <p>
          <span>Price: </span>
          <span ref={priceRef}>
            {price}
            {currencySymbol}
          </span>
        </p>
        {description && (
          <p>
            <span>Description:</span>
            <LongText description={description} />
          </p>
        )}

        <section className="btns-actions">
          {/* <button name="edit" onClick={() => setIsEdit(true)}>
            Edit
          </button>
          <button name="close" onClick={() => setSelectedBookId(null)}>
            Close
          </button> */}

          <button><Link to="/book" > Edit </Link></button>
          <button><Link to="/book" > Close </Link></button>
        </section>
      </section>
    </section>
  )
}
