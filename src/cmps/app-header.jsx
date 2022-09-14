import { NavLink } from 'react-router-dom'

export const AppHeader = () => {

  return (<section className="app-header">
    <header className="main-layout app-header">
      <div className="logo">
        <h1>Toys</h1>
      </div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/board">Board</NavLink>
        <NavLink to="/home">Board Home</NavLink>
        <NavLink to="/login">login</NavLink>
      </nav>
    </header>
  </section>
  )
}