
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'todo'

export const todoService = {
    query,
    getById,
    save,
    remove,
    getNeighborsId,
}


function query(filterBy) {
    return storageService.query(STORAGE_KEY)
        .then((todos) => {
            if (filterBy) {
                todos = (filterBy.category === 'active') ?
                    todos.filter(todo => !todo.isDone) :
                    (filterBy.category === 'done') ?
                        todos.filter(todo => todo.isDone) : todos
                if (filterBy.term && filterBy.term !== '') todos = todos.filter(todo => todo.txt.toLowerCase().includes(filterBy.term.toLowerCase()))
            }
            return todos
        })
}

function getById(todoId) {
    return storageService.get(STORAGE_KEY, todoId)
}

function remove(todoId) {
    // return Promise.reject('Not now!');
    return storageService.remove(STORAGE_KEY, todoId)
}

function save(todo) {
    if (todo._id) {
        return storageService.put(STORAGE_KEY, todo)
    } else {
        // When switching to backend - remove the next line!
        const user = userService.getLoggedInUser()
        todo.owner = user.fullName
        return storageService.post(STORAGE_KEY, todo)
    }
}

function getNeighborsId(todoId) {
    return storageService.query(STORAGE_KEY)
        .then((todos) => {
            const todoIdx = todos.findIndex(todo => todo._id === todoId)
            const nextIdx = (todoIdx + 1 === todos.length) ? 0 : todoIdx + 1
            const prevIdx = (todoIdx === 0) ? todos.length - 1 : todoIdx - 1
            return { prev: todos[prevIdx]._id, next: todos[nextIdx]._id }
        })
}