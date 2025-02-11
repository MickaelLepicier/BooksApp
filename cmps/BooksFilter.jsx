const { useState, useEffect } = React

export function BooksFilter({ filterBy, onSetFilter }) {
  const [booksFilter, setBooksFilter] = useState({ ...filterBy })

  useEffect(() => {
    let timeOutId = setTimeout(() => {
      onSetFilter(booksFilter)
    }, 500)

    return () => clearTimeout(timeOutId)
  }, [booksFilter])

  function updateFilter(ev) {
    let { type, name: field, value } = ev.target

    if (type === 'number') value = +value

    setBooksFilter((prevBooksFilter) => ({
      ...prevBooksFilter,
      [field]: value
    }))
  }

  return (
    <section className="filter-form">
      <h1>Filter Books</h1>
      <form onSubmit={onSetFilter}>
        <input
          type="text"
          name="title"
          value={booksFilter.title || ''}
          onChange={updateFilter}
          placeholder="Search by title"
        />
        <input
          type="number"
          name="price"
          value={booksFilter.price || ''}
          onChange={updateFilter}
          placeholder="Search by price"
        />

        <input
          type="number"
          name="publishedDate"
          value={booksFilter.publishedDate || ''}
          onChange={updateFilter}
          placeholder="Search by published year"
        />
        <input
          type="number"
          name="pageCount"
          value={booksFilter.pageCount || ''}
          onChange={updateFilter}
          placeholder="Search by number of pages"
        />
      </form>
    </section>
  )
}
