import { BookPreview } from './BookPreview.jsx'

export function BooksList({ books }) {
  // console.log('books: ',books);
  return (
    <section className="books-container">
      <h1>Books</h1>
      {books.map((book) => {
        // console.log('book: ',book);
        return <section key={book.id}>{<BookPreview book={book} />} </section>
      })}
    </section>
  )
}
