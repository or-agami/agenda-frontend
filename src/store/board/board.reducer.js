
const initialState = {
    isLoading: false,
    boards: [],
    board: null,
    filterBy: null,
    sortBy: null,
    modals: {
        itemId: null,
        isScreenOpen: false,
        isGroupMenuOpen: false,
        isTaskMenuOpen: false,
        isTaskStatusMenuOpen: false,
        isTaskPriorityMenuOpen: false,
        isTaskPersonMenuOpen: false,
        isColorMenuOpen: false,
        isBoardOptsOpen: false,
        isUserMenuOpen: false,
        isTaskDetailPersonMenuOpen: false,
    },
    task: null,
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
            return { ...state, boards: action.boards }

        case 'ADD_BOARD':
            boards = [...state.boards, action.board]
            return { ...state, boards }

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
            return { ...state, boards }

        case 'SET_FILTER':
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }

        case 'SET_SORT':
            return action.sortBy ?
                { ...state, sortBy: { ...state.sortBy, ...action.sortBy } }
                : { ...state, sortBy: null }


        case 'SET_BOARD':
            return { ...state, board: action.board }

        case 'CLOSE_MODALS':
            return { ...state, modals: initialState.modals }
        case 'OPEN_MODAL':
            return { ...state, modals: { ...state.modals, [action.stateName]: true, isScreenOpen: true, itemId: action.itemId } }
        case 'SET_TASK':
            return { ...state, task: action.task }
        default:
            return state
    }
}
