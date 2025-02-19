import { BookPreview } from './BookPreview.jsx'

const { Link } = ReactRouterDOM
// const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookList({ books, onRemove }) {
  return (
    <section className="books-container">
      {books.map((book) => {
        return (
          <section key={book.id} className="book-container">
            <BookPreview book={book} />

            <section className="btns-book">
            <Link to={`/book/${book.id}`}>
            <button>Details</button>
            </Link>
              
              <button onClick={() => { onRemove(book.id)}}>
                Delete
              </button>
            </section>
          </section>
        )
      })}
    </section>
  )
}

