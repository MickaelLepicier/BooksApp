import { reviewService } from '../services/review.service.js'

export function ReviewPreview({ review, onRemoveReview }) {
  const { id, fullName, rating, date, txt } = review

  function renderRating(rating) {
    const stars = []

    for (let i = 0; i < 5; i++) {
      const isActive = i < rating ? 'active' : ''
      stars.push(<i key={i} className={`fa-solid fa-star ${isActive}`}></i>)
    }

    return stars
  }
  return (
    <li className="review-details">
      {fullName}

      <p>{txt}</p>

      <section className="stars">{renderRating(rating)}</section>

      <h5>{new Date(date).toLocaleDateString('he')}</h5>

      <button onClick={() => onRemoveReview(id)}>Delete</button>
    </li>
  )
}
