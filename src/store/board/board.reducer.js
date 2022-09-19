
const initialState = {
    isLoading: true,
    boards: [],
    board: null,
    filterBy: null,
    sortBy: null,
    modals: {
        taskId: null,
        isScreenOpen: false,
        isGroupMenuOpen: false,
        isTaskMenuOpen: false,
        isTaskStatusMenuOpen: false,
        isTaskPriorityMenuOpen: false,
        isTaskPersonMenuOpen: false,
        isColorMenuOpen: false,
    }


}

export function boardReducer(state = initialState, action) {
    var boards, boardIdx, board, group, groups, groupIdx
    switch (action.type) {
        case 'INIT':
            state.init()
            return { ...state }

        case 'SET_LOADING':
            return { ...state, isLoading: action.isLoading }


        case 'SET_BOARDS':
            return { ...state, boards: action.boards, boardsLength: action.boards.length }

        case 'ADD_BOARD':
            boards = [action.board, ...state.boards]
            return { ...state, boards, boardsLength: boards.length }

        case 'UPDATE_BOARD':
            boards = state.boards.map((board) => {
                if (board._id !== action.board._id) return board
                return action.board
            })
            return { ...state, boards, board: action.board }

        case 'UPDATE_GROUP':
            return { ...state, board: action.board }

        case 'REMOVE_BOARD':
            boards = state.boards.filter(board => board._id !== action.boardId)
            return { ...state, boards, boardsLength: boards.length }

        case 'SET_FILTER':
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }

        case 'SET_SORT':
            return action.sortBy ?
                { ...state, sortBy: { ...state.sortBy, ...action.sortBy } }
                : { ...state, sortBy: null }


        case 'SET_BOARD':
            boardIdx = initialState.boards.findIndex(board => board._id === action.board._id)
            return { ...state, board: { ...action.board, idx: boardIdx }, boardsLength: initialState.boardsLength, neighborsId: action.neighborsId }

        case 'CLOSE_MODALS':
            return { ...state, modals: initialState.modals }
        case 'OPEN_MODAL':
            return { ...state, modals: { ...state.modals, [action.stateName]: true, isScreenOpen: true ,taskId:action.taskId} }
        case 'OPEN_SCREEN_MODAL':
            return {...state,modals:{...state.modals,isScreenOpen:true}}
        default:
            return state
    }
}
