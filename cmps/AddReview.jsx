const { useState, useEffect, useRef } = React

import { reviewService } from '../services/review.service.js'

export function AddReview({ onSaveReview, onToggleAddReview }) {
  const [reviewToAdd, setReviewToAdd] = useState(reviewService.getEmptyReview())
  const starsRef = useRef()

  function onSubmit(ev) {
    ev.preventDefault()

    // console.log('reviewToAdd: ',reviewToAdd)
    // TODO Fix bug to work with this line
    reviewToAdd.date = Date.now(reviewToAdd.date)
    // console.log('reviewToAdd: ',reviewToAdd)

    // console.log('review: ', review)
    onSaveReview(reviewToAdd)
    onToggleAddReview()
  }

  function handleChange(ev) {
    let { type, name: field, value } = ev.target

    if (type === 'number') value = +value
    // console.log('value: ', value)
    setReviewToAdd((prevReview) => ({ ...prevReview, [field]: value }))
  }

  function updateStar(rate) {
    updateRating(starsRef, rate)
    setReviewToAdd((prevReview) => ({ ...prevReview, ['rating']: rate }))
  }

  function updateRating(starsRef, rate) {
    const stars = starsRef.current.querySelectorAll('i')
    // console.log('stars: ',stars)

    stars.forEach((star, idx) => {
      if (rate >= idx + 1) star.classList.add('active')
      else star.classList.remove('active')
    })
  }

  const { fullName, date, txt } = reviewToAdd
  return (
    <section className='add-review'>
      <form onSubmit={onSubmit}>
      <div className='review-modal'>
        <h1>Add review</h1>

        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            autoComplete="off"
            autoFocus
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <section className="stars" ref={starsRef}>
            {reviewService.renderRating(reviewToAdd.rating, updateStar)}
          </section>

        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={handleChange}
            placeholder="When did you read it?"
          />
        </div>

        <textarea
          name="txt"
          cols="30"
          rows="10"
          value={txt}
          onChange={handleChange}
        ></textarea>

        <button>Save</button>
        <button type="button" onClick={onToggleAddReview}>
          Close
        </button>

        </div>
      </form>
    </section>
  )
}
