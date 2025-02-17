const { useState, useEffect, useRef } = React

const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { LongText } from '../cmps/LongText.jsx'
import { getCurrencySymbol } from '../services/util.service.js'
import { AddReview } from '../cmps/AddReview.jsx'
import { ReviewList } from '../cmps/ReviewList.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { reviewService } from '../services/review.service.js'

export function BookDetails() {
  const [book, setBook] = useState(null)
  const [isShowAddReview, setIsShowAddReview] = useState(false)

  const params = useParams()
  const navigate = useNavigate()

  const imgRef = useRef()
  const ribbonRef = useRef()
  const priceRef = useRef()

  useEffect(() => {
    loadBook()
  }, [params.bookId])

  useEffect(() => {
    if (book && priceRef.current) {
      priceRef.current.style.color = book.price > 150 ? 'red' : 'green'
      ribbonRef.current.hidden = book.isOnSale ? false : true
    }
  }, [book])

  function loadBook() {
    bookService
      .get(params.bookId)
      .then(setBook)
      .catch((err) => {
        console.error(`Did not find the book: ${err}`)
        showErrorMsg('Could not get the book...')
        navigate('/book')
      })
  }

  function getPageCountMsg() {
    if (!book.pageCount) return ''

    let msg = 'Light Reading'
    if (book.pageCount > 500) msg = 'Serious Reading'
    else if (book.pageCount > 200) msg = 'Descent Reading'

    return `(${msg})`
  }

  function getPublishedDateMsg() {
    if (!book.publishedDate) return ''

    const currDate = new Date()
    const currYear = currDate.getFullYear()
    const diff = currYear - book.publishedDate

    return diff >= 10 ? '(Vintage)' : '(New)'
  }

  function getLanguage() {
    const lngMap = {
      he: 'Hebrew',
      sp: 'Spanish',
      en: 'English'
    }

    return lngMap[book.language]
  }

  function onSaveReview(review) {
    // console.log('review: ', review)
    reviewService
      .addReview(params.bookId, review)
      .then((book) => {
        console.log('book: ', book)
        // setBook(book)
        setBook((prevBook) => {
          const reviews = [review, ...prevBook.reviews]
          return { ...prevBook, reviews }
        })
      })
      .catch((err) => console.log('err: ', err))
  }

  function onRemoveReview(reviewId) {
    reviewService.removeReview(params.bookId, reviewId).then(() => {
      setBook((prevBook) => {
        const filteredReviews = prevBook.reviews.filter(
          (review) => review.id !== reviewId
        )
        return { ...prevBook, reviews: filteredReviews }
      })
    })
  }

  function onToggleAddReview() {
    setIsShowAddReview((prevReview) => !prevReview)
  }

  if (!book) return 'Loading...'
  // console.log('book: ', book)

  return (
    <section className="book-details-container">
      <section className="book-img-wrapper">
        <img
          ref={imgRef}
          src={book.thumbnail || book.imgSrc}
          alt="book-image"
        />
        <div className="ribbon" ref={ribbonRef} hidden>
          <span>On Sale!</span>
        </div>
      </section>

      <section className="book-info">
        <h2>
          <span>Title:</span> {book.title}
        </h2>
        {book.authors && (
          <p>
            <span>Author: </span>
            {book.authors}
          </p>
        )}
        {book.publishedDate && (
          <p>
            <span>Published Date: </span>
            {book.publishedDate} {getPublishedDateMsg()}
          </p>
        )}
        {book.language && (
          <p>
            <span>Language: </span> {getLanguage()}
          </p>
        )}
        {book.pageCount && (
          <p>
            <span>Pages:</span> {book.pageCount} {getPageCountMsg()}
          </p>
        )}
        <p>
          <span>Price: </span>
          <span ref={priceRef}>
            {book.price}
            {getCurrencySymbol(book.currencyCode)}
          </span>
        </p>
        {book.description && (
          <p>
            <span>Description:</span>
            <LongText description={book.description} />
          </p>
        )}
      </section>
      <section className="btns-actions">
        <Link to={`/book/${book.prevBookId}`}>
          <button>
            <i className="fa-solid fa-arrow-left" />
          </button>
        </Link>

        <Link to={`/book/edit/${book.id}`}>
          <button>Edit</button>
        </Link>

        <button onClick={onToggleAddReview}>Add Reviews</button>

        <Link to="/book">
          <button>Close</button>
        </Link>

        <Link to={`/book/${book.nextBookId}`}>
          <button>
            <i className="fa-solid fa-arrow-right" />
          </button>
        </Link>
      </section>

      <ReviewList reviews={book.reviews} onRemoveReview={onRemoveReview} />

      {isShowAddReview && (
        <AddReview
          onSaveReview={onSaveReview}
          onToggleAddReview={onToggleAddReview}
        />
      )}
    </section>
  )
}

