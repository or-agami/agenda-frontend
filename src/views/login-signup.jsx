import { login, signup } from '../store/user/user.action'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../hooks/useForm'

export const LoginSignup = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

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
        <section className="login-signup">
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
        <section className="login-signup">
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
        <section className="user-login">
            {/* <form className="form user-login"
                onSubmit={(ev) => onUserLogin(ev)}>
                <input className="input input-username"
                    name="username"
                    type="text"
                    value={username}
                    placeholder="username"
                    onChange={handleChange} />
                <input className="input input-password"
                    name="password"
                    type="password"
                    value={password}
                    placeholder="password"
                    onChange={handleChange} />
                <input type="submit" hidden />
                <button className="btn btn-login">Login</button>
            </form> */}
        </section>
    )
}