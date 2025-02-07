import { BookPreview } from './BookPreview.jsx'

export function BookList({ books }) {
  // console.log('books: ',books);
  return (
    <section className="books-container">
      {/* <h1>Books</h1> */}
      {books.map((book) => {
        // console.log('book: ',book);
        return <BookPreview book={book} key={book.id}/>
      })}
    </section>
  )
}
