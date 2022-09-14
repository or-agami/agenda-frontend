import { userService } from '../../services/user.service.js'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'


export function login(creds) {
    return (dispatch) => {
        userService.login(creds)
            .then(loggedinUser => {
                dispatch({ type: 'SET_USER', loggedinUser })
                showSuccessMsg('Logged in successfully')
            })
            .catch(err => {
                showErrorMsg('Failed to add toy')
            })
    }
}

export function signup(creds) {
    return (dispatch) => {
        userService.signup(creds)
            .then(savedUser => {
                dispatch({ type: 'SET_USER', loggedinUser: creds })
                // history.push('/toy')
                // window.location.reload(false)
                showSuccessMsg('User added')
            })
            .catch(err => {
                console.error('Oops:', err)
                showErrorMsg('Cannot signup')
            })
    }
}

export function updateUser(creds) {
    return (dispatch) => {
        userService.save(creds)
            .then(savedUser => {
                dispatch({ type: 'UPDATE_USER', user: savedUser })
                showSuccessMsg('user updated')
            })
            .catch(err => { showErrorMsg('Failed to update user') })
    }
}

export function logout() {
    return (dispatch) => {
        userService.logout()
            .then(() => {
                dispatch({ type: 'SET_USER', loggedinUser: null })
            })
            .catch(err => {
                console.error('Oops:', err)
                showErrorMsg('Cannot logout')
            })
    }
}

export function addActivity(activity) {
    console.log('activity from userAction:', activity)
    return (dispatch) => {
        userService.addActivity(activity)
            .then(() => {
                dispatch({ type: 'SET_ACTIVITY', activity })
            })
            .catch(err => {
                console.error('Oops:', err)
                showErrorMsg('Cannot add activity')
            })
    }
}