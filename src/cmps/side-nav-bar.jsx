import { ReactComponent as BoardMenu } from '../assets/icons/board-menu.svg'
import { ReactComponent as PlusIcon } from '../assets/icons/plus-icon.svg'
import { ReactComponent as FilterIcon } from '../assets/icons/filter.svg'
import { ReactComponent as SearchIcon } from '../assets/icons/nav-bar/search.svg'
import { ReactComponent as BoardIcon } from '../assets/icons/board-icon.svg'
import { ReactComponent as Arrow } from '../assets/icons/down-arrow.svg'
import { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadBoards } from '../store/board/board.action'


export const SideNavBar = ({ isOpen, setStatus }) => {

    const dispatch = useDispatch()
    const boards = useSelector(state => state.boardModule.boards)

    const toggleSideNav = () => {
        setStatus(!isOpen)
    }

    useEffect(() => {
        if (!boards || boards.length < 1) {
            dispatch(loadBoards())
        }
    }, [])

    console.log(boards);
    if (!boards || boards.length < 1) return
    return <section className={isOpen ? "side-nav-bar" : "side-nav-bar closed"}>
        <button onClick={toggleSideNav} className="btn btn-svg toggle-nav-bar">
            <Arrow />
        </button>
        <div className="side-board-opts">
            <p className="board-name">{boards[0].title}</p>
            <BoardMenu />
        </div>
        <div className="side-nav-details">
            <div className="side-nav side-nav-add">
                <PlusIcon />
                Add
            </div>
            <div className=" side-nav side-nav-filter">
                <FilterIcon />
                Filter
            </div>
            <div className=" side-nav side-nav-search">
                <SearchIcon />
                Search
            </div>
        </div>
        <hr />
        {boards &&
            <div className="nav-board-list">
                {boards.map(board =>
                    <Link to={`/workspace/board/${board._id}`} key={board._id}>
                        <div className="nav-board-preview" >
                            <BoardIcon />
                            <p className="nav-board-title">{board.title}</p>
                        </div>
                    </Link>)}
            </div>}
    </section>
}