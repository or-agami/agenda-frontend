import { Home } from './views/home'
import { AppHome } from './views/app-home'
import { Board } from './views/board'
import { LoginSignup } from './views/login-signup'
import { UserWork } from './views/user-work'
import { NavBar } from './cmps/nav-bar'


export default [
    {
        path: '',
        component: <Home />,
    },
    {
        path: '/workspace',
        component: <NavBar />,
    },
    {
        path: '/workspace/home',
        component: <AppHome />,
    },
    {
        path: '/workspace/board/:boardId',
        component: <Board />,
    },
    {
        path: '/login',
        component: <LoginSignup />,
    },
    {
        path: '/workspace/my-work',
        component: <UserWork />,
    },
    // {
    //     path: '/profile',
    //     component: <UserProfile />,
    //     children: [
    //         {
    //             path: '/profile/settings',
    //             component: <UserSettings />,
    //         },
    //         {
    //             path: '/profile/signup',
    //             component: <UserSignup />,
    //         },
    //         {
    //             path: '/profile/login',
    //             component: <UserLogin />,
    //         },
    //     ]
    // },
]