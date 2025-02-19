export function RateByTextbox({ rating, handleChange }) {
  return (
    <input
      name="rating"
      value={rating || ''}
      onChange={handleChange}
      type="number"
    />
  )
}
