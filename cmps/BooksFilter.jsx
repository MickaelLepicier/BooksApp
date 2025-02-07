const { useState, useEffect } = React

export function BooksFilter({ filterBy, setFilterBy }) {
  const [booksFilter, setBooksFilter] = useState({ ...filterBy })

  useEffect(() => {
    let timeOutId = setTimeout(() => {
      // console.log('run function ')
      setFilterBy(booksFilter)
    }, 500)

    return () => clearTimeout(timeOutId)
  }, [booksFilter])

  function updateFilter(ev) {
    let { type, name: field, value } = ev.target

    if (type === 'number') value = +value

    setBooksFilter((prevBooksFilter) => ({ ...prevBooksFilter, [field]: value }))
  }

  return (
    <section className="filter-form">
      <h1>Filter Books</h1>
      <form onSubmit={setFilterBy}>
        {/* <label htmlFor="title">Title:</label>{' '} */}
        <input type="text" name="title" onChange={updateFilter} placeholder="Search by title" />
        {/* <label htmlFor="listPrice">Price:</label> */}
        <input type="number" name="listPrice" onChange={updateFilter} placeholder="Search by price" />
        {/* <button>Submit</button> */}
      </form>
    </section>
  )
}
