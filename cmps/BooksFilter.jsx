//
//
//
const { useState, useEffect, useRef } = React

export function BooksFilter({ filterBy, setFilterBy }) {
  const [booksFilter, setBooksFilter] = useState({ ...filterBy })
  console.log('filterBy: ', filterBy)
  useEffect(() => {
    setFilterBy(booksFilter)
  }, [])

  function updateFilter(ev) {
    let { type, name: field, value } = ev.target

    if (type === number) value = +value
    // const obj = {}
    // setBooksFilter(prevBooksFilter => )

    // TODO understand how filter is working then keep going
  }

  return (
    <section className="filter-form">
      <form onSubmit={setFilterBy}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          //   ref={titleRef}
          onChange={updateFilter}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          //   ref={priceRef}
          onChange={updateFilter}
        />

        <button>Submit</button>
      </form>
    </section>
  )
}
