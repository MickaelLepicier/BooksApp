export function AppHeader({ page, onSetPage }) {
 
    function onActive(val) {
    return page === val ? 'active' : ''
  }

  return (
    <header className="app-header main-layout">
    
      <h1 onClick={() => onSetPage('home')}>Books App</h1>
     
      <nav className="app-nav">

        <a href="#" className={onActive('home')} 
            onClick={() => onSetPage('home')}>
          Home
        </a>

        <a href="#" className={onActive('about')} 
            onClick={() => onSetPage('about')}>
          About
        </a>
        <a href="#" className={onActive('books')} 
            onClick={() => onSetPage('books')}>
          Books
        </a>
      </nav>
    </header>
  )
}
