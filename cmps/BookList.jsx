
import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, setSelectedBookId, onDelete }) {
 

  return (
    <section className="books-container">
      {books.map((book) => {

        return (
          <section key={book.id} className="book-container">
            <BookPreview book={book} />

            <section className="btns-book">
              <button onClick={() => setSelectedBookId(book.id)}>Details</button>
              <button onClick={() => onDelete(book.id)}>Delete</button>
            </section>
          </section>
        )
      })}
    </section>
  )
}
