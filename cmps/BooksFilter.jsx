//
// שואל לגבי שכשאני שומר אז שזה יסדר בצורה שהשורה תהיה ארוכה יותר
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

    setBooksFilter((prevBooksFilter) => ({ ...booksFilter, [field]: value }))

    // TODO understand how filter is working then keep going
  }

  return (
    <section className="filter-form">
      <form onSubmit={setFilterBy}>
        <label htmlFor="title">Title:</label>{' '}
        <input type="text" name="title" onChange={updateFilter} />
        <label htmlFor="price">Price:</label>
        <input type="number" name="price" onChange={updateFilter} />
        <button>Submit</button>
      </form>
    </section>
  )
}
