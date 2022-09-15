import { boardService } from "../../services/board.service"
// import { userService } from "../../services/user.service"
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service'


export function loadBoards() {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_LOADING', isLoading: true })

        const { filterBy } = getState().boardModule
        boardService.query(filterBy)
            .then((boards) => {
                console.log('boards from boardAction:', boards)
                dispatch({ type: 'SET_BOARDS', boards })
            })
            .catch(err => {
                showErrorMsg('Failed to load boards')
            })
            .finally(() => {
                dispatch({ type: 'SET_LOADING', isLoading: false })
            })
    }
}

export function removeBoard(boardId) {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_LOADING', isLoading: true })

        boardService.remove(boardId)
            .then(() => {
                showSuccessMsg('Board removed')
                dispatch({ type: 'REMOVE_BOARD', boardId })
            })
            .catch(err => {
                showErrorMsg('Failed to remove board')
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

export function loadBoard(boardId) {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_LOADING', isLoading: true })

        boardService.getById(boardId)
            .then((board) => {
                dispatch({ type: 'SET_BOARD', board })
            })
            .finally(() => {
                dispatch({ type: 'SET_LOADING', isLoading: false })
            })
    }
}

export function addBoard(board) {
    console.log('board:', board)
    return (dispatch, getState) => {

        dispatch({ type: 'SET_LOADING', isLoading: true })

        boardService.save(board)
            .then(savedBoard => {
                dispatch({ type: 'ADD_BOARD', board: savedBoard })
                showSuccessMsg('Board added')
            })
            .catch(err => {
                showErrorMsg('Failed to add board')
            })
            .finally(() => {
                dispatch({ type: 'SET_LOADING', isLoading: false })
            })
    }
}

export function updateBoard(board) {
    console.log('board from boardAction:', board)
    return (dispatch, getState) => {
        console.log('board:', board)
        dispatch({ type: 'SET_LOADING', isLoading: true })
        boardService.save(board)
            .then(savedBoard => {
                dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
                showSuccessMsg('Board updated')
            })
            .catch(err => {
                showErrorMsg('Failed to update board')
            })
            .finally(() => {
                dispatch({ type: 'SET_LOADING', isLoading: false })
            })
    }
}

export function addMsg(msg) {
    return (dispatch, getState) => {
        dispatch({ type: 'ADD_MSG', msg })
    }
}