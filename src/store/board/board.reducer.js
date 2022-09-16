
const initialState = {
    isLoading: true,
    boards: [],
    board: null,
    filterBy: null,
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
            console.log('action.boards:', action.boards)
            return { ...state, boards: action.boards, boardsLength: action.boards.length }

        case 'ADD_BOARD':
            boards = [action.board, ...state.boards]
            return { ...state, boards, boardsLength: boards.length }

        case 'UPDATE_BOARD':
            boards = state.boards.map((board) => {
                if (board._id !== action.board._id) return board
                return action.board
            })
            return { ...state, boards, boardsLength: boards.length }

        case 'ADD_TASK': // EXAMPLE: { groupId: 'g101', title: 'new task' }
            board = state.board
            groupIdx = board.groups.findIndex((group) => group.id === action.groupId)
            group = board.groups[groupIdx]
            group.tasks.push(action.task)
            board.groups.splice(groupIdx, 1, group)
            return { ...state, board }
            
            case 'REMOVE_TASK': // EXAMPLE: { groupId: 'g102', taskId: 'c103' }
            board = state.board
            groupIdx = board.groups.findIndex((group) => group.id === action.groupId)
            group = board.groups[groupIdx].filter(task => task.id !== action.taskId)
            board.groups.splice(groupIdx, 1, group)
            return { ...state, board }

        case 'REMOVE_BOARD':
            boards = state.boards.filter(board => board._id !== action.boardId)
            return { ...state, boards, boardsLength: boards.length }


        case 'SET_FILTER':
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy, labels: [...action.filterBy.labels] } }


        case 'SET_BOARD':
            boardIdx = initialState.boards.findIndex(board => board._id === action.board._id)
            return { ...state, board: { ...action.board, idx: boardIdx }, boardsLength: initialState.boardsLength, neighborsId: action.neighborsId }


        default:
            return state
    }
}
