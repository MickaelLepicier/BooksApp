const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
  // function onActive(val) {
  //   return page === val ? 'active' : ''
  // }

  return (
    <header className="app-header main-layout">
      {/* <h1 onClick={() => onSetPage('home')}>Books App</h1> */}

      <h1>
        <Link to="/">Books App</Link>
      </h1>
      
      <nav className="app-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/book">Books</NavLink>


        {/* <a href="#" className={onActive('home')} 
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
        </a> */}
      </nav>
    </header>
  )
}
