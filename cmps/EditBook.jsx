const { useState, useEffect, useRef } = React

export function EditBook({ bookId, book, onAdd, onUpdate }) {
  // title, listPrice, publishedDate, pageCount

  const [title, setTitle] = useState('')

  // TODO - Focus on Add a book

  const currFunc = bookId ? onUpdate : onAdd
  const headerMsg = bookId ? 'Update' : 'Add'

  return (
    <section>
      <h1>{headerMsg} the Book!</h1>

      {/* TODO Create more labels and inputs + make a useState that hold all of them */}
      <form onSubmit={(ev) => currFunc(ev, title.target.value)}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          //   value={book.title || ''}
          onChange={setTitle}
          placeholder="Wright a title"
        />

        <button>Submit</button>
      </form>
    </section>
  )
}
