const { useState, useEffect, useRef } = React

const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { LongText } from '../cmps/LongText.jsx'
import { getCurrencySymbol } from '../services/util.service.js'
import { AddReview } from '../cmps/AddReview.jsx'
import { ReviewList } from '../cmps/ReviewList.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function BookDetails() {
  const [book, setBook] = useState(null)
  const [IsAddReview, setIsAddReview] = useState(false)

  const params = useParams() // the bookId is inside this hook
  const navigate = useNavigate()

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
      .then(setBook)
      .catch((err) => {
        console.error(`Did not find the book: ${err}`)
        showErrorMsg('Could not get the book...')
        navigate('/book')
      })
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
    const lngMap = {
      he: 'Hebrew',
      sp: 'Spanish',
      en: 'English'
    }

    return lngMap[lng]
  }

  function saveReview(review) {
    // save the review and set the book

    bookService
      .addReview(params.bookId, review)
      .then((book) => {
        console.log('book: ', book)
        setBook(book)
      })
      .catch((err) => console.log('err: ', err))
  }

  function onRemove(reviewId) {
    const updatedReviews = reviews.filter((review) => review.id !== reviewId)
    setBook((prevBook) => ({ ...prevBook, reviews: updatedReviews }))

    bookService.removeReview(params.bookId, updatedReviews)
  }

  function onClose() {
    setIsAddReview(false)
  }

  if (!book) return 'Loading...'
  console.log('book: ', book)

  const {
    title,
    price,
    authors,
    currencyCode,
    language,
    pageCount,
    publishedDate,
    description,
    reviews,
    isOnSale,
    nextBookId,
    prevBookId,
    thumbnail,
    imgSrc
  } = book

  const pageCountMsg = getPageCountMsg(pageCount)
  const publishedDateMsg = getPublishedDateMsg(publishedDate)
  const currencySymbol = getCurrencySymbol(currencyCode)
  const bookLanguage = getLanguage(language)

  // TODO Create reviewList & reviewPreview

  // TODO later on create more comps for shorter code

  // Put const { Routes, Route } = ReactRouterDOM in <AddReview>
  // Show modal with: fullname, rating, readAt
  // render a list of the reviews
  // CSS make the .book-details-container as grid

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
        {authors && (
          <p>
            <span>Author: </span>
            {authors}
          </p>
        )}
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
      </section>
      <section className="btns-actions">

        <Link to={`/book/${book.prevBookId}`}>
        <button><i className='fa-solid fa-arrow-left'/></button>
        </Link>

        <Link to={`/book/edit/${book.id}`}>
          <button>Edit</button>
        </Link>

        <button onClick={() => setIsAddReview(true)}>Add Reviews</button>

        <Link to="/book">
          <button>Close</button>
        </Link>

        <Link to={`/book/${book.nextBookId}`}>
        <button><i className='fa-solid fa-arrow-right'/></button>
        </Link>
      </section>
      <ReviewList reviews={reviews} onRemove={onRemove} />
      {/* TODO in modal */}
      {IsAddReview && <AddReview saveReview={saveReview} onClose={onClose} />}
    </section>
  )
}

/*

              <button name="edit" onClick={() => setIsEdit(true)}>
                 Edit
              </button>
        
              <button name="close" onClick={() => setSelectedBookId(null)}>
                 Close
              </button>
          
          */
