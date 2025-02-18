import { reviewService } from "../services/review.service.js"

const {useRef} = React

export function RateBySelect({reviewToAdd, setReviewToAdd}) {

  const starsRef = useRef()

  function updateStar(rate) {
    updateRating(starsRef, rate)
    setReviewToAdd((prevReview) => ({ ...prevReview, ['rating']: rate }))
  }

  function updateRating(starsRef, rate) {
    const stars = starsRef.current.querySelectorAll('i')

    stars.forEach((star, idx) => {
      if (rate >= idx + 1) star.classList.add('active')
      else star.classList.remove('active')
    })
  }

  return (
    <section className="stars" ref={starsRef}>
      {reviewService.renderRating(reviewToAdd.rating, updateStar)}
    </section>
  )
}
