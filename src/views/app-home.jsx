import { Loader } from '../cmps/loader'
import appHeaderImg from '../assets/icons/app-header-background.svg'
import arrowSvg from '../'


export const AppHome = () => {

    return (
        <section className="app-home">
            <Header />
            <section className='main-panel-container'>
                <Inbox />
                <Recent />
                <MyWorkspaces />
            </section>
        </section>
    )
}

const Header = () => {
    return (
        <header className="app-home-header">
            <div className='header-container'>
                <h2>Good morning, User!</h2>
                <h1>Let's start the day off right :{')'}</h1>
            </div>
            <img src={appHeaderImg} alt="" />
        </header>
    )
}

const Inbox = () => {
    return <section className='app-home-inbox'>
        <div>
            <img src="" alt="" />
            <h1></h1>
        </div>
    </section>
}

const Recent = () => {
    return <section className='app-home-recent'>

    </section>
}

const MyWorkspaces = () => {
    return <section className='app-home-myworkspaces'>

    </section>
}