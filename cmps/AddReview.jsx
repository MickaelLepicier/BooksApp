const { useState } = React

import { reviewService } from '../services/review.service.js'
import { Rating } from './Rating.jsx'

export function AddReview({ onSaveReview, onToggleAddReview }) {
  const [reviewToAdd, setReviewToAdd] = useState(reviewService.getEmptyReview())
  const [cmpType, setCmpType] = useState('stars')

  function onSubmit(ev) {
    ev.preventDefault()

    reviewToAdd.date = new Date(reviewToAdd.date).getTime()
    onSaveReview(reviewToAdd)
    onToggleAddReview()
  }

  function handleChange({ target }) {
    let { type, name: field, value } = target

    if (type === 'number' || type === 'select-one') {
      value = +value
    }
    if (value >= 5) value = 5

    setReviewToAdd((prevReview) => ({ ...prevReview, [field]: value }))
  }

  function onChangeCmpType({ target }) {
    const selectedType = target.value
    setCmpType(selectedType)
  }

  const { fullName, date, txt } = reviewToAdd
  return (
    <section className="add-review">
      <form onSubmit={onSubmit}>
        <div className="review-modal">
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

          <div className="rate-by-choise">
            <p className="bold-txt">Select rating type:</p>

            <label htmlFor="select">Select</label>
            <input
              type="radio"
              name="rating"
              id="select"
              onChange={onChangeCmpType}
              value="select"
            />

            <label htmlFor="numInput">Number Input</label>
            <input
              type="radio"
              name="rating"
              id="numInput"
              onChange={onChangeCmpType}
              value="numInput"
            />

            <label htmlFor="stars">Stars</label>
            <input
              type="radio"
              name="rating"
              id="stars"
              onChange={onChangeCmpType}
              value="stars"
            />

            <div className='rating'>
              <Rating
                cmpType={cmpType}
                rating={reviewToAdd.rating}
                handleChange={handleChange}
              />
            </div>
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
