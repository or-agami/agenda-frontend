import {login,signup} from '../store/user/user.action'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

export const LoginSignup =() => {
    const [noLogin,setNoLogin] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        console.log(noLogin)
    },[noLogin])
    const onLoginSubmit = (ev) => {
        ev.preventDefault()
        dispatch(login({ username: ev.target[0].value, password: ev.target[1].value }))
        .then(()=>{
            navigate('/toy')
        })
    }

    const onSignupSubmit = (ev) => {
        ev.preventDefault()
        const user = {
            fullname: ev.target[0].value,
            username: ev.target[1].value,
            password: ev.target[2].value,
        }
        dispatch(signup(user))
        .then(()=>{
            navigate('/toy')
        })


    }
   return <section className="login-signup">
            {!noLogin && <form onSubmit={(ev) => onLoginSubmit(ev)}>
                <input name="username" type="text" placeholder="Enter username" />
                <input name="password" type="password" placeholder="Enter password" />
                <button>Login <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true" class="icon_component monday-style-button--right-icon icon_component--no-focus-style"><path d="M2.24999 10.071C2.24999 9.65683 2.58578 9.32104 2.99999 9.32104L15.3315 9.32105L10.7031 4.69273C10.4103 4.39983 10.4103 3.92496 10.7031 3.63207C10.996 3.33917 11.4709 3.33917 11.7638 3.63207L17.6725 9.54071C17.9653 9.83361 17.9653 10.3085 17.6725 10.6014L11.7638 16.51C11.4709 16.8029 10.996 16.8029 10.7031 16.51C10.4103 16.2171 10.4103 15.7423 10.7031 15.4494L15.3315 10.821L2.99999 10.821C2.58578 10.821 2.24999 10.4853 2.24999 10.071Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></button>
            </form>}
            {!noLogin && <button onClick={() => setNoLogin(prevNoLogin => prevNoLogin = true)}>Don't have a login?</button>}
            {noLogin && <form onSubmit={(ev) => onSignupSubmit(ev)}>
                <input name="fullname" type="text" placeholder="Fullname" />
                <input name="username" type="text" placeholder="Enter a username" />
                <input name="password" type="password" placeholder="Enter a password" />
                <button>Sign-up</button>
            </form>}
        </section>
}