import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, setSelectedBookId }) {
  function onDelete(bookId) {
    //
  }

  // console.log('books: ',books);
  return (
    <section className="books-container">
      {/* <h1>Books</h1> */}
      {books.map((book) => {
        // console.log('book: ',book);

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
