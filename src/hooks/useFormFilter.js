import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFilter } from '../store/toy/toy.action'

export const useFilter = () => {
    const dispatch = useDispatch()
    const debounceTimer = useRef()
    const { filterBy } = useSelector(state => state.toyModule)
    const [filter, onSetFilter] = useState({})

    useEffect(() => {
        clearTimeout(debounceTimer.current)
        debounceTimer.current = setTimeout(() => {
            dispatch(setFilter({ ...filterBy, ...filter }))
        }, 2000)
    }, [filter])

    const handleChange = (change) => {
        onSetFilter(prevFilter => ({ ...prevFilter, ...change }))
    }
    return [filter, handleChange, onSetFilter]
}