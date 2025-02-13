const { useState, useEffect, useRef } = React

export function AddReview({ saveReview }) {
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

  function updateRating(rate) {
    const stars = starsRef.current.querySelectorAll('i')
    // console.log('stars: ',stars)

    stars.forEach((star, idx)=>{
      if(rate >= idx + 1 ) star.classList.add('active')
        else star.classList.remove('active')
    })

    setReview((prevReview) => ({ ...prevReview, ['rating']: rate }))

    // add active to the class of the stars
    // call updateReview(rate) - the rate is in an array
  }

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
            <i onClick={() => updateRating(1)} className="fa-solid fa-star"></i>
            <i onClick={() => updateRating(2)} className="fa-solid fa-star"></i>
            <i onClick={() => updateRating(3)} className="fa-solid fa-star"></i>
            <i onClick={() => updateRating(4)} className="fa-solid fa-star"></i>
            <i onClick={() => updateRating(5)} className="fa-solid fa-star"></i>
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
      </form>
    </section>
  )
}
