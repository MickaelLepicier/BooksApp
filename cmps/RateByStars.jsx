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
    handleChange({ target })
  }

  function updateRating(starsRef, rate) {
    const stars = starsRef.current.querySelectorAll('i')

    stars.forEach((star, idx) => {
      if (rate >= idx + 1) star.classList.add('active')
      else star.classList.remove('active')
    })
  }

  function renderRating(rating, updateStar) {
    const stars = []

    for (let i = 0; i < 5; i++) {
      const isActive = i < rating ? 'active' : ''

      stars.push(
        <i
          key={i}
          value={rating || ''}
          onClick={() => {
            updateStar(i + 1)
          }}
          className={`fa-solid fa-star edit ${isActive}`}
        ></i>
      )
    }

    return stars
  }

  return (
    <section className="stars" ref={starsRef}>
      {renderRating(rating, updateStar)}
    </section>
  )
}
