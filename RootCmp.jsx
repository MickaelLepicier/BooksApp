import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'

export function App() {
  return (
    <section className="app">
      <header className="app-header main-layout">
        <h1>Books App</h1>
      </header>
      <main className="main-layout">
        {/* <HomePage /> */}
        {/* <AboutUs /> */}
        <BookIndex />
      </main>
    </section>
  )
}
