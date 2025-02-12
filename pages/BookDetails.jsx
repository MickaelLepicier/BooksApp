import { bookService } from '../services/book.service.js'
import { LongText } from '../cmps/LongText.jsx'
import { getCurrencySymbol } from '../services/util.service.js'
import { AddReview } from '../cmps/AddReview.jsx'

const { useState, useEffect, useRef } = React

const { useParams, useNavigation, Link } = ReactRouterDOM

export function BookDetails() {
  const [book, setBook] = useState(null)
  const [IsAddReview, setIsAddReview] = useState(false)

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
    const lngMap ={
      he: 'Hebrew',
      sp: 'Spanish',
      en: 'English',
    }

    return lngMap[lng]
  }

  
  function saveReview(){
    // create a function that save the review and set the book
    //
  }

  if (!book) return 'Loading...'
  // console.log('book: ', book)

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
    thumbnail,
    imgSrc
  } = book

  const pageCountMsg = getPageCountMsg(pageCount)
  const publishedDateMsg = getPublishedDateMsg(publishedDate)
  const currencySymbol = getCurrencySymbol(currencyCode)
  const bookLanguage = getLanguage(language)
 
  const bookReviews = reviews.length ? reviews : ' There are no reviews'
  // TODO Create reviewList & reviewPreview

  // TODO later on create more comps for shorter code

  // TODO Put const { Routes, Route } = ReactRouterDOM in <AddReview>

  // btn Add Review - <AddReview>
  // open on the same page fullname, rating, readAt
  // create - bookService.addReview(bookId, review) file
  // render a list of the reviews
  // CSS make the .book-details-container as grid

  return (
    <section className="book-details-container">
      <section className="book-img-wrapper">
        <img ref={imgRef} src={thumbnail || imgSrc} alt="book-image" />
        <div className="ribbon" ref={ribbonRef} hidden>
          <span>On Sale!</span>
        </div>
        <section className="btns-actions">
          <button>
            <Link to={`/book/edit/${book.id}`}> Edit </Link>
          </button>
          <button>
            <Link to="/book"> Add Reviews </Link>
          </button>
          <button>
            <Link to="/book"> Close </Link>
          </button>

        </section>
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
        <p>
          <span>Reviews:</span>
          {bookReviews}
        </p>
        {/* <AddReview saveReview={saveReview}/> */}
      </section>
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
