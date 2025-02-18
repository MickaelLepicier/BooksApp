const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

  return (
    <header className="app-header main-layout">
 
      <h1>
        <Link to="/">Books App</Link>
      </h1>
      
      <nav className="app-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/book">Books</NavLink>


      </nav>
    </header>
  )
}
