import logoIcon from '../assets/icons/agenda-logo-color.svg'
import { Loader } from '../cmps/loader'

export const Index = () => {

    return <section className="index">
        <header className="main-header">
            <div className="logo">
                <img src={logoIcon} />
                <h1>agenda</h1>
                <Loader />

            </div>
        </header>
    </section>
}