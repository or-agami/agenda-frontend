import { Loader } from '../cmps/loader'
import appHeaderImg from '../assets/icons/app-header-background.svg'


export const AppHome = () => {

    return (
        <section className="app-home">
            <Header />
            <h1>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h1>
        </section>
    )
}

const Header = () => {
    return (
        <header className="home-app-header">
            <div>
                <h2>Good morning, User!</h2>
                <h1>Let's start the day off right :{')'}</h1>
            </div>
            <img src={appHeaderImg} alt="" />
        </header>
    )
}