import { Home } from './views/home'
import { NavBar } from './cmps/nav-bar'
import { LoginSignup } from './views/login-signup'

export default [
    {
        path: '',
        component: <Home />,
    },
    {
        path: '/workspace/*',
        component: <section className="agenda-app"><NavBar /></section>,
    },
    {
        path: '/auth/*',
        component: <LoginSignup />,
    },
]