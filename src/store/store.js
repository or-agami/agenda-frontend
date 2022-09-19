import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'

import thunk from 'redux-thunk'
import { boardReducer } from './board/board.reducer'


const rootReducer = combineReducers({
    boardModule: boardReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)
window.gStore = store