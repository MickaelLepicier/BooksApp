import { bookService } from '../services/book.service.js'
import { LongText } from '../cmps/LongText.jsx'

const { useState, useEffect, useRef } = React

export function BookDetails({ bookId, setSelectedBookId }) {
  const [book, setBook] = useState(null)
// const [isTextLong, setIsTextLong] = useState()

  const imgRef = useRef()
  const ribbonRef = useRef()
  const priceRef = useRef()

  useEffect(() => {
    loadBook()
  }, [])

  useEffect(()=>{
    if(book && priceRef.current){
     priceRef.current.style.color = amount > 150? 'red' : 'green'
     ribbonRef.current.hidden = isOnSale? false : true
    } 
   },[book])

  
  function loadBook() {
    bookService
      .get(bookId)
      .then((book) => setBook(book))
      .catch((err) => console.error(`Did not find the book: ${err}`))
  }


  if (!book) return 'Loading...'
    // console.log('book: ', book)

  const { id, title, imgSrc, language, pageCount, publishedDate, description, listPrice } = book
  const { amount, currencyCode, isOnSale } = listPrice

  
  const pageCountMsg = getPageCountMsg(pageCount)
  const publishedDateMsg = getPublishedDateMsg(publishedDate)
  

  function getPageCountMsg(pageCount){
    let msg = 'Light Reading'
    if(pageCount > 500) msg = 'Serious Reading'
    else if(pageCount > 200) msg = 'Descent Reading'
    // else if(pageCount < 100) msg = 'Light Reading'
    return msg
  }

  function getPublishedDateMsg(publishedDate){
    const date = new Date()
    const currYear = date.getFullYear()
    const diff = currYear - publishedDate
    
    return diff >= 10? 'Vintage' : 'New'
  }

  

  return (
    <section className="book-details-container">
     
      <section className="book-img-wrapper">
            <img ref={imgRef} src={imgSrc} alt="book-image" />
            <div className="ribbon" ref={ribbonRef} hidden><span>On Sale!</span></div>
      </section>

      <section className="book-info">
        <h2><span>Title:</span> {title}</h2>
        <p>
            <span>Published Date: </span>
            {publishedDate} ({publishedDateMsg})
        </p>
        <p><span>Language: </span> {language}</p>
        <p><span>Pages:</span> {pageCount} ({pageCountMsg})</p>
        <p>
            <span>Price: </span>
                <span ref={priceRef}>{amount}$</span>
        </p>
        <p>
            <span>Description:</span>
            <LongText description={description} />
        </p>

        <section className="btns-actions">
          <button onClick={() => setSelectedBookId(null)}>Edit</button>
          <button onClick={() => setSelectedBookId(null)}>Close</button>
        </section>
      </section>
    </section>
  )
}
