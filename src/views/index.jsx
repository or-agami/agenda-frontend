import logoIcon from '../assets/icons/agenda-logo-color.svg'
import { NavLink } from 'react-router-dom'

export const Index = () => {

    return (
        <section className="index">
            <Header />
        </section>
    )
}

const Header = () => {
    return (
        <header className="main-header">
            <div className="logo">
                <img src={logoIcon} />
                <h1>agenda</h1>
            </div>
            <nav className="header-nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/board">Board</NavLink>
                <NavLink to="/home">Board Home</NavLink>
                <NavLink to="/login">login</NavLink>
            </nav>
        </header>
    )
}