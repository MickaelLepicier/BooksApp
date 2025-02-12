const { useState, useEffect, useRef } = React

export function AddReview({saveReview}) {
  const [review, setReview] = useState([])

  function onSubmit() {}
  function updateReview() {}


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
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            name="rating"
            // value={book.price || ''}
            onChange={updateBook}
            placeholder="Rate the book"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            name="date"
            // value={book.publishedDate || ''}
            onChange={updateBook}
            placeholder="When did you read it?"
          />
        </div>
      </form>
    </section>
  )
}
