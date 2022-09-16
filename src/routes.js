import { Home } from './views/home'
import { NavBar } from './cmps/nav-bar'
import { AppHome } from './views/app-home'
import { Board } from './views/board'
import { LoginSignup } from './views/login-signup'
import { UserWork } from './views/user-work'
import { Inbox } from './views/inbox'


export default [
    {
        path: '',
        component: <Home />,
    },
    {
        path: '/workspace/*',
        component: <section className="agenda-app"><NavBar /></section>,
        children: [
            {
                path: '/home',
                component: <AppHome />,
            },
            {
                path: '/board/:boardId',
                component: <Board />,
            },
            {
                path: '/inbox',
                component: <Inbox />,
            }
        ]
    },
    {
        path: '/login',
        component: <LoginSignup />,
    },
    {
        path: '/workspace/my-work',
        component: <UserWork />,
    },
]