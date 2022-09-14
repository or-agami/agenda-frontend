import { toyService } from "../../services/toy.service"
// import { userService } from "../../services/user.service"
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service'

export function getActionAddMsg(msg) {
    return { type: 'ADD_MSG', msg }
  }

export function loadToys() {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_LOADING', isLoading: true })

        const { filterBy } = getState().toyModule
        console.log('filterBy from toyAction:', filterBy)
        toyService.query(filterBy)
            .then((toys) => {
                dispatch({ type: 'SET_TOYS', toys })
            })
            .catch(err => {
                showErrorMsg('Failed to load toys')
            })
            .finally(() => {
                dispatch({ type: 'SET_LOADING', isLoading: false })
            })
    }
}

export function removeToy(toyId) {
    return (dispatch, getState) => {
        // const { loggedinUser } = getState().userModule
        // if (!loggedinUser) return showErrorMsg('You must login first')
        dispatch({ type: 'SET_LOADING', isLoading: true })

        toyService.remove(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
                dispatch({ type: 'REMOVE_TOY', toyId })
                //     userService.addActivity({ txt: 'Removed toy', at: Date.now() })
            })
            .catch(err => {
                showErrorMsg('Failed to remove toy')
            })
            .finally(() => {
                dispatch({ type: 'SET_LOADING', isLoading: false })
            })
    }
}

// var debounceTimer
export function setFilter(filterBy) {
    return (dispatch) => {
        dispatch({ type: 'SET_FILTER', filterBy })
    }
}

export function loadToy(toyId) {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_LOADING', isLoading: true })

        Promise.all([toyService.getById(toyId), toyService.getNeighborsId(toyId)])
            .then(([toy, neighborsId]) => {
                dispatch({ type: 'SET_TOY', toy, neighborsId })
            })
            .finally(() => {
                dispatch({ type: 'SET_LOADING', isLoading: false })
            })
    }
}

export function addToy(toy) {
    console.log('toy:', toy)
    return (dispatch, getState) => {
        // const { loggedinUser } = getState().userModule
        // if (!loggedinUser) return showErrorMsg('You must login first')

        dispatch({ type: 'SET_LOADING', isLoading: true })

        toyService.save(toy)
            .then(savedToy => {
                dispatch({ type: 'ADD_TOY', toy: savedToy })
                showSuccessMsg('Toy added')
                // userService.addActivity({ txt: 'Added toy', at: Date.now() })
                //     .then((activity) => dispatch({ type: 'ADD_ACTIVITY', activity }))
            })
            .catch(err => {
                showErrorMsg('Failed to add toy')
            })
            .finally(() => {
                dispatch({ type: 'SET_LOADING', isLoading: false })
            })
    }
}

export function updateToy(toy) {
    console.log('toy from toyAction:', toy)
    return (dispatch, getState) => {
        console.log('toy:', toy)
        dispatch({ type: 'SET_LOADING', isLoading: true })
        toyService.save(toy)
            .then(savedToy => {
                dispatch({ type: 'UPDATE_TOY', toy: savedToy })
                showSuccessMsg('Toy updated')
                // userService.addActivity({ txt: 'Updated toy', at: Date.now() })
                //     .then((activity) => dispatch({ type: 'ADD_ACTIVITY', activity }))
            })
            .catch(err => {
                showErrorMsg('Failed to update toy')
            })
            .finally(() => {
                dispatch({ type: 'SET_LOADING', isLoading: false })
            })
    }
}

export function addMsg(msg) {
    return (dispatch, getState) => {
        dispatch({type: 'ADD_MSG', msg})
    }
}