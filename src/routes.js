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
            // {
            //     path: '/board',
            //     component: <Board />,
            // },
            {
                path: '/inbox',
                component: <Inbox />
            },
            {
                path: '/board/:boardId',
                component: <Board />,
            },
        ]
    },
    // {
    //     path: '/workspace',
    //     component: <NavBar />,
    //     children: [
    //         {
    //             path: '/workspace/home',
    //             component: <AppHome />,
    //         },
    //         {
    //             path: '/workspace/board',
    //             component: <Board />,
    //         },
    //         // {
    //         //     path: '/workspace/board/:boardId',
    //         //     component: <Board />,
    //         // },
    //     ]
    // },
    {
        path: '/login',
        component: <LoginSignup />,
    },
    {
        path: '/workspace/my-work',
        component: <UserWork />,
    },
]