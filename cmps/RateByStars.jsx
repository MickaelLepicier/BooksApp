import { reviewService } from '../services/review.service.js'

const { useRef } = React

export function RateByStars({ rating, handleChange }) {
  const starsRef = useRef()

  function updateStar(rate) {

    const target = {
      name: 'rating',
      value: rate
    }

    updateRating(starsRef, rate)
    handleChange({target})
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
      {reviewService.renderRating(rating, updateStar)}
    </section>
  )
}
