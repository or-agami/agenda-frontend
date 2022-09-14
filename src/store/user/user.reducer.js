import { userService } from "../../services/user.service"


const initialState = {
    loggedinUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action) {
    var loggedinUser, activities
    switch (action.type) {

        case 'SET_USER':
            return { ...state, loggedinUser: action.loggedinUser }

        case 'SET_PROFILE_PAGE':
            return { ...state, profilePage: action.profilePage }
            
        default:
            return state
    }
}
