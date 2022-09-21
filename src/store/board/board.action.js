import { boardService } from "../../services/board.service"
// import { userService } from "../../services/user.service"
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service'
import { groupService } from "../../services/group.service"
import { taskService } from "../../services/task.service"


export function loadBoards() {
    return async (dispatch, getState) => {
        dispatch({ type: 'SET_LOADING', isLoading: true })
        try {
            const boards = await boardService.query()
            dispatch({ type: 'SET_BOARDS', boards })
        } catch (err) {
            showErrorMsg('Failed to load boards')
        } finally {
            dispatch({ type: 'SET_LOADING', isLoading: false })
        }
    }
}

export function removeBoard(boardId) {
    return async (dispatch, getState) => {
        dispatch({ type: 'SET_LOADING', isLoading: true })
        try {
            boardService.remove(boardId)
            dispatch({ type: 'REMOVE_BOARD', boardId })
            showSuccessMsg('Board removed succesfully')
        } catch (err) {
            showErrorMsg('Failed to remove board')
        } finally {
            dispatch({ type: 'SET_LOADING', isLoading: false })
        }
    }
}

export function setFilter(filterBy) {
    return (dispatch) => {
        dispatch({ type: 'SET_FILTER', filterBy })
    }
}

export function setSort(sortBy) {
    return (dispatch) => {
        dispatch({ type: 'SET_SORT', sortBy })
    }
}

export function loadBoard(boardId, sortBy, filterBy) {
    return async (dispatch, getState) => {
        if (!sortBy && !filterBy) dispatch({ type: 'SET_LOADING', isLoading: true })
        try {
            const board = await boardService.getById(boardId, sortBy, filterBy)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            showErrorMsg('Failed to load board try again later')
        } finally {
            dispatch({ type: 'SET_LOADING', isLoading: false })
        }
    }
}

export function addBoard(board) {
    return (dispatch, getState) => {

        dispatch({ type: 'SET_LOADING', isLoading: true })

        boardService.save(board)
        .then(savedBoard => {
            dispatch({ type: 'ADD_BOARD', board: savedBoard })
        })
        .catch(err => {
            showErrorMsg('Failed to add board try again')
        })
            .finally(() => {
                dispatch({ type: 'SET_LOADING', isLoading: false })
            })
    }
}

export function updateBoard(board) {
    return (dispatch, getState) => {
        boardService.save(board)
            .then(updatedBoard => {
                dispatch({ type: 'UPDATE_BOARD', board: updatedBoard })
            })
            .catch(err => {
                showErrorMsg('Failed to update board')
            })
            .finally(() => {
                dispatch({ type: 'SET_LOADING', isLoading: false })
            })
    }
}

export function addTask(task) {
    return (dispatch, getState) => {
        taskService.save(task)
            .then(savedBoard => {
                dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
            })
            .catch(err => {
                showErrorMsg('Failed to add task')
            })
    }
}

export function updateTask(task, activity) {
    return async (dispatch, getState) => {
        try {
            const savedBoard = await taskService.update(task, activity)
            dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
        } catch (err) {
            showErrorMsg('Failed to update task')
        }
    }
}

export function removeTask(task) {
    return (dispatch, getState) => {
        taskService.remove(task)
            .then(savedBoard => {
                dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
                showSuccessMsg('Task removed succesfully')
            })
            .catch(err => {
                showErrorMsg('Failed to remove task')
            })
    }
}

export function addGroup(boardId) {
    return (dispatch, getState) => {
        groupService.save(boardId)
            .then(savedBoard => {
                dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
            })
            .catch(err => {
                showErrorMsg('Failed to add group')
            })
    }
}

export function updateGroup(group) { // 👈 group is obj prop: { group, boardId }
    return (dispatch, getState) => {
        groupService.update(group)
            .then(savedBoard => {
                dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
            })
            .catch(err => {
                showErrorMsg('Failed to update group')
            })
    }
}

export function removeGroup(group) {
    return (dispatch, getState) => {
        groupService.remove(group)
            .then(savedBoard => {
                dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
                showSuccessMsg('Group removed succesfully')
            })
            .catch(err => {
                showErrorMsg('Failed to remove group')
            })
    }
}

export function closeModals() {
    return (dispatch) => {
        dispatch({ type: 'CLOSE_MODALS' })
    }
}

export function openModal(stateName, itemId) {
    return (dispatch) => {
        dispatch({ type: 'OPEN_MODAL', stateName, itemId })
    }
}

export function loadTask(task) {
    return (dispatch) => {
        taskService.getById(task)
        .then(task=>{
            dispatch({type:'SET_TASK',task})
        })
        .catch(err=>{
            showErrorMsg('Failed to load task')
        })
    }
}