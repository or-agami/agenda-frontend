import { Logo } from '../cmps/logo'
import { login, signup } from '../store/user/user.action'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { useForm } from '../hooks/useForm'

export const LoginSignup = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [signupFields, handleSignupChange, setSignupFields] = useForm({
        fullname: '',
        username: '',
        password: '',
    })

    useEffect(() => {
        console.log('params:', params)
        if (params['*'] !== 'login' && params['*'] !== 'signup') navigate('/auth/login')
        console.log('window.location:', window.location)
    }, [params])

    const onUserSignup = (ev) => {
        ev.preventDefault()
        console.log('signupFields:', signupFields)
    }
    return (
        <section className="login-signup">
            <Header />
            {/* {params['*'] !== 'login' &&
                <Login/>} */}

            {params['*'] !== 'signup' &&
                <NavLink to='/auth/signup'>Signup</NavLink>}
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </section>
    )
}

const Signup = (props) => {
    const dispatch = useDispatch()
    const [signupFields, handleSignupChange, setSignupFields] = useForm({
        fullname: '',
        username: '',
        password: '',
    })


    const onUserSignup = (ev) => {
        ev.preventDefault()
        console.log('signupFields:', signupFields)
    }
    return (
        <section className="signup">
            <h1>hello signup</h1>
            {/* <form className="form user-signup"
                onSubmit={(ev) => onUserSignup(ev)}>
                <input className="input input-username"
                    name="username"
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={handleChange} />
                <input className="input input-full-name"
                    name="fullname"
                    type="text"
                    value={fullname}
                    placeholder="Full name"
                    onChange={handleChange} />
                <input className="input input-password"
                    name="password"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={handleChange} />
                <input type="submit" hidden />
                <button className="btn btn-register">Register</button>
            </form> */}
        </section>
    )
}

const Login = (props) => {
    const dispatch = useDispatch()
    const [loginFields, handleLoginChange, setLoginFields] = useForm({
        username: '',
        password: '',
    })

    const onUserLogin = (ev) => {
        ev.preventDefault()
        // console.log('signupFields:', signupFields)
    }

    return (
        <section className="flex login">
            <h1 className="title">Log in to your account</h1>
            <form className="flex form form-user-login"
                onSubmit={(ev) => onUserLogin(ev)}>
                <label class="enter-work-email" for="user_email">Enter your work email address</label>
                <input className="input input-username"
                    name="username"
                    type="text"
                    // value={username}
                    placeholder="username"
                    // onChange={handleChange} 
                    />
                <input className="input input-password"
                    name="password"
                    type="password"
                    // value={password}
                    placeholder="password"
                    // onChange={handleChange} 
                    />
                <input type="submit" hidden />
                <button className="btn btn-login">Login</button>
            </form>
        </section>
    )
}

const Header = () => {
    return (
        <header className="main-header">
            <div className="main-header-container main-layout">
                <Logo />
            </div>
        </header>
    )
}