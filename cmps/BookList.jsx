import { BookPreview } from './BookPreview.jsx'

const { Link } = ReactRouterDOM
// const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookList({ books, onRemove }) {
  return (
    <section className="books-container">
      {books.map((book) => {
        // <Link to={`/book/book${book.id}}> Details </Link>
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

/*

    <button onClick={() => setSelectedBookId(book.id)}>Details</button>
    <button onClick={() => onDelete(book.id)}>Delete</button>

*/
