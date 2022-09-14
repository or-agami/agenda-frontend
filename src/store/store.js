import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'

import thunk from 'redux-thunk'
// import { userReducer } from './user/user.reducer'
// import { toyReducer } from './board/toy.reducer'


const rootReducer = combineReducers({
    // userModule: userReducer,
    // toyModule: toyReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)
window.gStore = store