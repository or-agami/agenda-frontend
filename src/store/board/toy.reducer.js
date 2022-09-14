import { toyService } from "../../services/toy.service"

const initialState = {
    isLoading: true,
    toys: [],
    toy: null,
    neighborsId: {
        prev: null,
        next: null,
    },
    toysLength: 0,
    filterBy: {
        term: '',
        maxPrice: null,
        category: 'all',
        labels: [],
    },
    init: toyService.query()
        .then((toys) => {
            if (toys.length === 0) return
            initialState.toys = toys
            initialState.toysLength = toys.length
        })
}

export function toyReducer(state = initialState, action) {
    var toys, toyIdx, toy
    switch (action.type) {
        case 'INIT':
            state.init()
            return { ...state }

        case 'SET_LOADING':
            return { ...state, isLoading: action.isLoading }


        case 'SET_TOYS':
            return { ...state, toys: action.toys, toysLength: action.toys.length }

        case 'ADD_TOY':
            toys = [action.toy, ...state.toys]
            return { ...state, toys, toysLength: toys.length }

        case 'UPDATE_TOY':
            toys = state.toys.map((toy) => {
                if (toy._id !== action.toy._id) return toy
                return action.toy
            })
            return { ...state, toys, toysLength: toys.length }

        case 'ADD_MSG':
            toy = { ...state.toy, msgs: [...state.toy.msgs, action.msg] }
            return { ...state, toy }

        case 'REMOVE_TOY':
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys, toysLength: toys.length }


        case 'SET_FILTER':
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy, labels: [...action.filterBy.labels] } }


        case 'SET_TOY':
            toyIdx = initialState.toys.findIndex(toy => toy._id === action.toy._id)
            return { ...state, toy: { ...action.toy, idx: toyIdx }, toysLength: initialState.toysLength, neighborsId: action.neighborsId }


        default:
            return state
    }
}
