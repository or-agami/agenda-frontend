import { NavLink } from 'react-router-dom'
import bgImg from '../assets/img/home-bg-img.jpg'
import { Logo } from '../cmps/logo'

export const Home = () => {
    return (
        <section className="home">
            <Header />
            <div className="home-bg-div">
                <img className='bg-img' src={bgImg} />
                <div className="home-hero main-layout">
                    <h2>A platform for company
                        <br />tasks managment
                    </h2>
                    <button className="btn-get-started-big">Get Started
                        <div className='svg svg-icon arrow-right'>
                            <svg width="10" height="14" viewBox="0 0 9 7" ><path fillRule="evenodd" clipRule="evenodd" d="M4.628.616a.5.5 0 1 0-.64.768L6.203 3.23H.5a.5.5 0 0 0 0 1h5.612L3.988 6a.5.5 0 1 0 .64.769l3.23-2.693a.5.5 0 0 0 0-.768L4.628.616z"></path></svg>
                        </div>
                    </button>
                    <p className='home-btn-txt'>Start here your own <span>agenda</span></p>
                </div>
            </div>
                <Footer />
        </section>
    )
}

const Header = () => {
    return (
        <header className="main-header">
            <div className="main-header-container main-layout">
                <Logo />
                <nav className="header-nav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/workspace/board">Board</NavLink>
                    <NavLink to="/workspace/home">Board Home</NavLink>
                    <NavLink to="/auth/login">Log in</NavLink>
                    <button className="btn-get-started">Get Started
                        <div className='svg svg-icon arrow-right'>
                            <svg width="10" height="14" viewBox="0 0 9 7" ><path fillRule="evenodd" clipRule="evenodd" d="M4.628.616a.5.5 0 1 0-.64.768L6.203 3.23H.5a.5.5 0 0 0 0 1h5.612L3.988 6a.5.5 0 1 0 .64.769l3.23-2.693a.5.5 0 0 0 0-.768L4.628.616z"></path></svg>
                        </div>
                    </button>
                </nav>
            </div>
        </header>
    )
}

const Footer = () => {
    return <footer className="main-footer">
        <Logo />
    </footer>
}
