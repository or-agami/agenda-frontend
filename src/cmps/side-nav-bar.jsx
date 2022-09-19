import { ReactComponent as BoardMenu } from '../assets/icons/board-menu.svg'
import { ReactComponent as PlusIcon } from '../assets/icons/plus-icon.svg'
import { ReactComponent as FilterIcon } from '../assets/icons/filter.svg'
import { ReactComponent as SearchIcon } from '../assets/icons/nav-bar/search.svg'
import { ReactComponent as BoardIcon } from '../assets/icons/board-icon.svg'
import { ReactComponent as Arrow } from '../assets/icons/down-arrow.svg'
import { useState } from "react"
import { Link, NavLink, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadBoards, removeBoard, updateBoard } from '../store/board/board.action'
import { AddBoardModal } from './board-add-modal'
import { ReactComponent as MenuIcon } from '../assets/icons/board-menu.svg'
import { ReactComponent as TrashIcon } from '../assets/icons/trash-icon.svg'
import { ReactComponent as PencilIcon } from '../assets/icons/pencil.svg'
import { useForm } from '../hooks/useForm'


export const SideNavBar = ({ isOpen, setIsOpen, boards, board, setCurrBoard }) => {

    const dispatch = useDispatch()
    const [isAddBoard, setIsAddBoard] = useState(false)

    const toggleSideNav = () => {
        setIsOpen(!isOpen)
    }

    if (!boards || boards.length < 1) return
    return <section className={isOpen ? "side-nav-bar" : "side-nav-bar closed"}>
        <button onClick={toggleSideNav} className="btn btn-svg toggle-nav-bar">
            <Arrow />
        </button>
        <div className="side-board-opts">
            <p className="board-name">Workspace</p>
            <BoardMenu />
        </div>
        <div className="side-board-workspace-name">
            <div className="board-preview-icon">A</div>
            <h5>agenda workspace</h5>
        </div>
        <div className="side-nav-details">
            <div onClick={() => setIsAddBoard(!isAddBoard)} className="side-nav side-nav-add">
                <PlusIcon />
                Add
            </div>
            <div className="side-nav side-nav-filter">
                <FilterIcon />
                Filter
            </div>
            <div className="side-nav side-nav-search">
                <SearchIcon />
                Search
            </div>
        </div>
        <hr />
        {boards &&
            <div className="nav-board-list">
                {boards.map(board =>
                    <NavBoardPreview setCurrBoard={setCurrBoard}
                        board={board}
                        key={board._id}
                        boards={boards} />)}
            </div>}
        {isAddBoard &&
            <AddBoardModal setIsAddBoard={setIsAddBoard}
                isAddBoard={isAddBoard} />}
    </section>
}




const NavBoardPreview = ({ board, setCurrBoard, boards }) => {

    const dispatch = useDispatch()
    const [isBoardOpts, setIsBoardOpts] = useState(false)
    const [isRenaming, setIsRenaming] = useState(false)
    const [renameBoard, handleChange] = useForm({ title: board.title })

    const openBoardSettings = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        setIsBoardOpts(!isBoardOpts)
    }

    const onRemoveBoard = (ev, boardId) => {
        ev.preventDefault()
        ev.stopPropagation()
        dispatch(removeBoard(boardId))
        setIsBoardOpts(!isBoardOpts)
        setCurrBoard(boards[0])
    }

    const onEditBoard = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        setIsRenaming(!isRenaming)
        setIsBoardOpts(!isBoardOpts)
    }

    const onRenameBoard = (ev) => {
        ev.preventDefault()
        board = { ...board, ...renameBoard }
        setIsRenaming(!isRenaming)
        dispatch(updateBoard(board))
    }


    if (isRenaming) return <form className="rename-board" onSubmit={onRenameBoard} onBlur={onRenameBoard}>
        <BoardIcon />
        <input autoFocus type="text" name='title' value={renameBoard.title} onChange={handleChange} />
    </form>
    return (
        <NavLink to={`/workspace/board/${board._id}`} className="nav-board-preview">
            <BoardIcon />
            <p className="nav-board-title">{board.title}</p>
            <button className='btn btn-svg'><MenuIcon onClick={openBoardSettings} /></button>
            {isBoardOpts && <div className='board-opts-modal'>
                <div onClick={(ev) => onEditBoard(ev)} className="nav-board-menu-opt">
                    <PencilIcon />
                    <span>Rename Board</span>
                </div>
                <div onClick={(ev) => onRemoveBoard(ev, board._id)} className="nav-board-menu-opt">
                    <TrashIcon />
                    <span>Remove Board</span>
                </div>
            </div>}
        </NavLink>
    )
}