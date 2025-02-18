import { bookService } from '../services/book.service.js'
import { Chart } from '../cmps/Chart.jsx'

const { useState, useEffect, useRef } = React

export function Dashboard() {
  const [books, setBooks] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    loadBooks()
    loadCategories()
  }, [])

  function loadBooks() {
    bookService
      .query()
      .then(setBooks)
      .catch((err) => console.error('Could not get the Books Data: ', err))
  }

  function loadCategories() {
    bookService
      .getCategories()
      .then(setCategories)
      .catch((err) =>
        console.error('Could not get the Books Categories Data: ', err)
      )
  }

  if (!books) return <div>Loading...</div>
  return (
    <section className="dashboard">
      <h1>Dashboard</h1>
      <h2>Statistics for {books.length} books</h2>
      <h4>By Categories </h4>
      <Chart data={categories} />
    </section>
  )
}
