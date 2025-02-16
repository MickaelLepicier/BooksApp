import { reviewService } from '../services/review.service.js'

export function ReviewPreview({ review, onRemoveReview }) {
  const { id, fullName, rating, date, txt } = review

  return (
    <li className="review-details">
      {fullName}

      <p>{txt}</p>

      <section className="stars">{reviewService.renderRating(rating)}</section>

      <h5>{new Date(date).toLocaleDateString('he')}</h5>

      <button onClick={() => onRemoveReview(id)}>Delete</button>
    </li>
  )
}
