import { Loader } from '../cmps/loader'

export const AppHome = () => {

    return (
        <section className="app-home">
            <Header />
        </section>
    )
}

const Header = () => {
    return (
        <header className="main-header">
            <h1>app home header</h1>
        </header>
    )
}