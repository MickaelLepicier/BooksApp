import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'

import { AppHeader } from './cmps/AppHeader.jsx'

const { useState } = React

// TODO
// change colors on CSS
// Fix bug on render value of isOnSale on Update a book in EditBook
// In BookIndex change the put and post to save from bookService
// Later on learn RegExp
// Fix bug on LongText - when I press "More" the box don't need to go down
// Make the CSS files the same name as the jsx files

export function App() {
  const [page, setPage] = useState('books')

  function onSetPage(page) {
    setPage(page)
  }

  return (
    <section className="app">
      <AppHeader page={page} onSetPage={onSetPage} />

      <main className="main-layout">
        {page === 'home' && <HomePage />}
        {page === 'about' && <AboutUs />}
        {page === 'books' && <BookIndex />}
      </main>
    </section>
  )
}
