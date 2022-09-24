import { Home } from './views/home'
import { NavBar } from './cmps/nav-bar'
import { AppHome } from './views/app-home'
import { Board } from './views/board'
import { LoginSignup } from './views/login-signup'
import { UserWork } from './views/user-work'
import { Inbox } from './views/inbox'
import { Dashboard } from './views/dashboard'
import { Kanban } from './views/kanban'

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
                path: '/board/kanban/:boardId',
                component: <Kanban />,
            },
            {
                path: '/board/dashboard/:boardId',
                component: <Dashboard />,
            },
            {
                path: '/board/:boardId/*',
                component: <Board />,
            },
            {
                path: '/inbox',
                component: <Inbox />,
            }
        ]
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
    {
        path: '/workspace/my-work',
        component: <UserWork />,
    },
]