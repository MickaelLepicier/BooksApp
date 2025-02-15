import { ReviewPreview } from './ReviewPreview.jsx'

export function ReviewList({ reviews,onRemove }) {
  console.log('reviews: ', reviews)




  if (!reviews) return 'Loading...'

  return (
    <section className="reviews-container">
      <h1>Reviews</h1>
      <ul className="reviews">
        {!reviews.length && <li>There are no reviews</li>}
        {reviews.map((review) => (
          <ReviewPreview key={review.id} review={review} onRemove={onRemove} />
        ))}
      </ul>
    </section>
  )
}
