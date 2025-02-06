//

const { useState, useEffect } = React

export function BooksFilter({ filterBy, setFilterBy }) {
  const [booksFilter, setBooksFilter] = useState({ ...filterBy })
  // console.log('filterBy: ', filterBy)

  useEffect(() => {
    setFilterBy(booksFilter)
  }, [booksFilter])

  function updateFilter(ev) {
    let { type, name: field, value } = ev.target

    if (type === 'number') value = +value

    setBooksFilter((prevBooksFilter) => ({ ...prevBooksFilter, [field]: value }))

    
  }

  return (
    <section className="filter-form">
      <form onSubmit={setFilterBy}>
        <label htmlFor="title">Title:</label>{' '}
        <input type="text" name="title" onChange={updateFilter} />
        <label htmlFor="listPrice">Price:</label>
        <input type="number" name="listPrice" onChange={updateFilter} />
        <button>Submit</button>
      </form>
    </section>
  )
}
