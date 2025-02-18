const { useState } = React

import { reviewService } from '../services/review.service.js'
import { RateBySelect } from './RateBySelect.jsx'

export function AddReview({ onSaveReview, onToggleAddReview }) {
  const [reviewToAdd, setReviewToAdd] = useState(reviewService.getEmptyReview())

  function onSubmit(ev) {
    ev.preventDefault()

    reviewToAdd.date = new Date(reviewToAdd.date).getTime()
    onSaveReview(reviewToAdd)
    onToggleAddReview()
  }

  function handleChange(ev) {
    let { type, name: field, value } = ev.target

    if (type === 'number') value = +value
    setReviewToAdd((prevReview) => ({ ...prevReview, [field]: value }))
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
          <div className="form-group">
            <label htmlFor="rating">Rating:</label>

            <RateBySelect reviewToAdd={reviewToAdd} setReviewToAdd={setReviewToAdd}/>

         
          </div>

            {/*

TODO make it dynamic comp

Dynamic Components
• Support 3 different ways of rating a book using 3 types of dynamic
components which receive a val prop and fire a selected event
- <RateBySelect>
- <RateByTextbox>
- <RateByStars>
Let the user choose his preferred way of rating by using radio buttons.
          
            <RateBySelect>
            <RateByTextbox>
            <RateByStars></RateByStars>

            */}

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
