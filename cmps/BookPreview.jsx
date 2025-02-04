export function BookPreview({ book }) {
  const { id, title, listPrice } = book
  //   console.log('book: ', book)

  return (
    <section className="book-container" >
      <h2>{title}</h2>
      <p>{listPrice}</p>
    </section>
  )
}
