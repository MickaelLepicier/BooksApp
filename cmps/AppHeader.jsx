

export function AppHeader({page,onSetPage}){

    function onActive(val){
return page === val? 'active' : ''
    }
    return <header className="app-header main-layout">
    <h1>Books App</h1>
    <nav className="app-nav">
        <a className={onActive('home')} onClick={()=>onSetPage('home')} href="#">Home</a>
        <a className={onActive('about')} onClick={()=>onSetPage('about')} href="#">About</a>
        <a className={onActive('books')} onClick={()=>onSetPage('books')} href="#">Books</a>
    </nav>
  </header>
}