import { Home } from './views/home'
import { NavBar } from './cmps/nav-bar'
import { AppHome } from './views/app-home'
import { Board } from './views/board'
import { LoginSignup } from './views/login-signup'
import { UserWork } from './views/user-work'
import { Inbox } from './views/inbox'
import { Dashboard } from './views/dashboard'
import { MyWork } from './views/my-work'
import { Kanban } from './views/kanban'

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
        // children: [
        //     {
        //         path: '/login',
        //         component: <Login />
        //     },
        //     {
        //         path: '/signup',
        //         component: <Signup />
        //     },
        // ]
    },
]