import { updateRating } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function AddReview({ saveReview,onClose }) {
  const [review, setReview] = useState({})
  const starsRef = useRef()

  function onSubmit(ev) {
    ev.preventDefault()

    console.log('review: ',review)
    saveReview(review)
  }

  function updateReview(ev) {
    let { type, name: field, value } = ev.target

    if (type === 'number') value = +value
    // console.log('value: ', value)
    setReview((prevReview) => ({ ...prevReview, [field]: value }))
  }

  function updateStar(rate) {
    updateRating(starsRef,rate)
    setReview((prevReview) => ({ ...prevReview, ['rating']: rate }))
  }

// TODO create a comp of AddReview and use it to add a review

  // function updateRating(starsRef,rate) {
  //   const stars = starsRef.current.querySelectorAll('i')
  //   // console.log('stars: ',stars)

  //   stars.forEach((star, idx)=>{
  //     if(rate >= idx + 1 ) star.classList.add('active')
  //       else star.classList.remove('active')
  //   })
  
    // setReview((prevReview) => ({ ...prevReview, ['rating']: rate }))

    // add active to the class of the stars
    // call updateReview(rate) - the rate is in an array
  // }

  // when I save the review in the service

  // get date
  return (
    <section>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            name="fullName"
            // value={book.title || ''}
            onChange={updateReview}
            placeholder="Wright your full name"
            required
          />
        </div>
        {/* Look at the video and make Stars */}
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <section className="stars" ref={starsRef}>
            <i onClick={() => updateStar(1)} className="fa-solid fa-star"></i>
            <i onClick={() => updateStar(2)} className="fa-solid fa-star"></i>
            <i onClick={() => updateStar(3)} className="fa-solid fa-star"></i>
            <i onClick={() => updateStar(4)} className="fa-solid fa-star"></i>
            <i onClick={() => updateStar(5)} className="fa-solid fa-star"></i>
          </section>

          {/* <input
            type="range"
            min={1}
            max={5}
            name="rating"
            // value={book.price || ''}
            onChange={updateReview}
            placeholder="Rate the book"
            required
          /> */}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            name="date"
            // value={book.publishedDate || ''}
            onChange={updateReview}
            placeholder="When did you read it?"
          />
        </div>
        <button>Submit</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </section>
  )
}
