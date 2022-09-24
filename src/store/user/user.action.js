import { userService } from '../../services/user.service.js'
import { showSuccessMsg, showErrorMsg, isUsernameVerified } from '../../services/event-bus.service.js'


export function checkUsername(username) {
    return async (dispatch) => {
        try {
            await userService.verifyUsername(username)
            isUsernameVerified('VERIFIED')
        } catch (err) {
            isUsernameVerified('NOT_FOUND')
        }
    }
}

export function login(creds) {
    return async (dispatch) => {
        try {
            const loggedinUser = await userService.login(creds)
            dispatch({ type: 'SET_USER', loggedinUser })
            isUsernameVerified('LOGGEDIN_SUCCESSFULLY')
            // showSuccessMsg('Logged in successfully')
        } catch (err) {
            showErrorMsg('Failed to login')
        }
    }
}

export function signup(creds) {
    return async (dispatch) => {
        try {
            const savedUser = await userService.signup(creds)
            dispatch({ type: 'SET_USER', loggedinUser: creds })
            showSuccessMsg('User added')
        } catch (err) {
            console.error('Oops:', err)
            showErrorMsg('Cannot signup')
        }
    }
}

export function updateUser(creds) {
    return async (dispatch) => {
        try {
            const savedUser = await userService.update(creds)
            dispatch({ type: 'SET_USER', user: savedUser })
            showSuccessMsg('user updated')
        } catch (err) {
            showErrorMsg('Failed to update user')
        }
    }
}

export function logout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({ type: 'SET_USER', loggedinUser: null })
        } catch (err) {
            console.error('Oops:', err)
            showErrorMsg('Cannot logout')
        }
    }
}