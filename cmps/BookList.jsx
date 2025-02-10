
import { BookPreview } from './BookPreview.jsx'

const {Link} = ReactRouterDom

export function BookList({ books, setSelectedBookId, onDelete }) {
 

  return (
    <section className="books-container">
      {books.map((book) => {
// <Link to={`/book/book${book.id}}> Details </Link>
        return (
          <section key={book.id} className="book-container">
            <BookPreview book={book} />

            <section className="btns-book">
              {/* <button onClick={() => setSelectedBookId(book.id)}>Details</button>
              <button onClick={() => onDelete(book.id)}>Delete</button> */}
              <button><Link to={`/book/${book.id}`}> Details </Link></button>
              <button><Link to={`/book/${book.id}`}> Delete </Link></button>
            </section>
          </section>
        )
      })}
    </section>
  )
}
