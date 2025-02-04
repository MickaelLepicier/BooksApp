import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BooksIndex } from './pages/BooksIndex.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'

const { useState } = React

export function App() {

  const [page, setPage] = useState('books')

  function onSetPage(page){
    setPage(page)
  }

  return (
    <section className="app">
      <AppHeader page={page} onSetPage = {onSetPage}/>
      
      <main className="main-layout">
        {page === 'home' && <HomePage />}
        {page === 'about' && <AboutUs />}
       {page === 'books' &&  <BooksIndex />}
      </main>
    </section>
  )
}
