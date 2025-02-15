import { updateRating } from '../services/util.service.js'

// const { useState, useEffect, useRef } = React

export function ReviewPreview({ review, onRemove }) {
  const { id, fullName, rating, date } = review

  // fullName, rating, date, remove-btn

  function renderRating() {
    const stars = []

    for (let i = 1; i <= 5; i++) {
      const isActive = i < rating ? 'active' : ''
      stars.push(<i key={i} className={`fa-solid fa-star ${isActive}`}></i>)
    }

    return stars
  }

  function renderDate() {
    // TODO use CR to figer how to brings the Israel timeline
    if (!date) return ''
    const [year, month, day] = date.split('-')

    return `${day}.${month}.${year}`
  }

  return (
    <li>
      {fullName}

      <section className="stars">{renderRating()}</section>

      {renderDate()}
      <button onClick={() => onRemove(id)}>Delete</button>
    </li>
  )
}
