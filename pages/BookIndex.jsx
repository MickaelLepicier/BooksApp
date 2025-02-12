import { BookDetails } from './BookDetails.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { BooksFilter } from '../cmps/BooksFilter.jsx'
import { BookEdit } from './BookEdit.jsx'
import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React

const { useParams, useNavigation, Link } = ReactRouterDOM

// I can do that the Add Book will be a Modal or Nested Route (Route inside Route)
export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  // const [selectedBookId, setSelectedBookId] = useState(null)
  // const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService
      .query(filterBy)
      .then(setBooks)
      .catch((err) => console.error('Could not get the Books Data: ', err))
  }

  function onAdd(newBook) {
    newBook.imgSrc = '../assets/img/1.jpg'
    // newBook.thumbnail = '../assets/img/1.jpg'

    bookService
      .post(newBook)
      .then(() => {
        // TODO put the msg on msg Modal
        // navigate("/book")
        // navigate("-1")
        // event-bus.service.js - for the <UserMsg/>:
        //eventBusService.emit("show-user-msg", {txt:"Book is saved"})
        //showUserMsg("show-user-msg", {txt:"Book is saved"})
        //showUserMsg("show-user-msg")

        console.log('Book is saved')
      })
      .catch((err) => {
        //showUserMsg("show-user-msg", {txt:"Book is saved"})
        //showUserMsg("show-user-msg")

        console.log(`The book did not Added: ${err}`)
      })
  }

  function onUp1date(book) {
    bookService
      .put(book)
      .then(() => {
        // TODO put the msg on msg Modal
        // navigate("/book")
        console.log('Book is updated')
      })
      .catch((err) => console.log(`The book did not Updated: ${err}`))
  }

  function onRemove(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId))
        showSuccessMsg('Book has been Deleted')
      })
      .catch((err) => {
        console.log(err)
        showErrorMsg('Book has not been Deleted')
      })
  }

  function onSetFilter(filterByToEdit) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterByToEdit }))
  }

  if (!books) return <div>Loading...</div>

  return (
    <section className="book-index-container">
      <BooksFilter filterBy={filterBy} onSetFilter={onSetFilter} />

      <button className="btn-add">
        <Link to="/book/edit">Add Book</Link>
      </button>

      <BookList books={books} onRemove={onRemove} />

      {!books.length && <div>No books found</div>}
    </section>
  )
}

/*

     {isEdit && (
        <section>
          // Update a Book 
          {selectedBookId && (
            <BookEdit
              bookId={selectedBookId}
              onUpdate={onUpdate}
              setIsEdit={setIsEdit}
              setSelectedBookId={setSelectedBookId}
            />
          )}

          // Add a Book 
          {!selectedBookId && <BookEdit onAdd={onAdd} setIsEdit={setIsEdit} />}
        </section>
      )}


      {!isEdit && (
        <section>
          {selectedBookId && (
            <BookDetails
              bookId={selectedBookId}
              setSelectedBookId={setSelectedBookId}
              setIsEdit={setIsEdit}
            />
          )}

           {!selectedBookId && (  
           
           )}

          </section>
           )}

           <button className="btn-add" onClick={() => setIsEdit(true)}>
                Add Book
              </button>

*/
