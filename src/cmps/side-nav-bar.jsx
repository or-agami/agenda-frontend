import { ReactComponent as BoardMenu } from '../assets/icons/board-menu.svg'
import { ReactComponent as PlusIcon } from '../assets/icons/plus-icon.svg'
import { ReactComponent as FilterIcon } from '../assets/icons/filter.svg'
import { ReactComponent as SearchIcon } from '../assets/icons/nav-bar/search.svg'
import { ReactComponent as BoardIcon } from '../assets/icons/board-icon.svg'
import { ReactComponent as Arrow } from '../assets/icons/down-arrow.svg'
import { Fragment, useState } from "react"
import { Link, NavLink, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { closeModals, loadBoards, openModal, removeBoard, updateBoard } from '../store/board/board.action'
import { AddBoardModal } from './board-add-modal'
import { ReactComponent as MenuIcon } from '../assets/icons/board-menu.svg'
import { ReactComponent as TrashIcon } from '../assets/icons/trash-icon.svg'
import { ReactComponent as PencilIcon } from '../assets/icons/pencil.svg'
import { useForm } from '../hooks/useForm'
import { GrClose } from 'react-icons/gr'
import { PopUpModal } from './pop-up-modal'


export const SideNavBar = ({ isOpen, setIsOpen, boards, board, setCurrBoard, isFavorites }) => {


    const onSearch = () => {
        setNewBoards(boards.filter(board => board.title.toLowerCase().includes(searchBoardBy.term.toLowerCase())))
    }

    const cancelSearch = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        setIsSearch(false)
        setSearchBoardBy({ term: "" })
    }

    const [searchBoardBy, handleChange, setSearchBoardBy] = useForm({ term: "" }, onSearch)
    const [isAddBoard, setIsAddBoard] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const [newBoards, setNewBoards] = useState(boards)
    const [menuModalIsOpen, setMenuModalIsOpen] = useState()
    
    const loggedinUser = useSelector(state => state.userModule.loggedinUser)

    const toggleSideNav = () => {
        setIsOpen(!isOpen)
    }

    const onSearchBoardClick = () => {
        setIsSearch(true)
    }

    useEffect(() => {
        setNewBoards(boards)
    }, [boards])



    return <section className={isOpen ? "side-nav-bar" : "side-nav-bar closed"}>
        <button onClick={toggleSideNav} className="btn btn-svg toggle-nav-bar">
            <Arrow />
        </button>
        {menuModalIsOpen && <PopUpModal setMenuModalIsOpen={setMenuModalIsOpen} />}
        {isFavorites ? <div className="favorite-boards">
            {loggedinUser.favBoards.map(board => {
                // <NavFavoritesPreview boardId={board} setCurrBoard={setCurrBoard} boards={newBoards} />
            })}
        </div>
            :
            <Fragment>
                <div className="side-board-opts">
                    <button className="btn btn-svg"
                        onClick={() => setMenuModalIsOpen(!menuModalIsOpen)} >
                        <p className="board-name">Workspace</p>
                        <BoardMenu />
                    </button>
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
                    <div onClick={onSearchBoardClick} className="side-nav side-nav-search">
                        <SearchIcon />
                        {!isSearch && "Search"}
                        {isSearch && <form>
                            <input value={searchBoardBy.term} autoFocus name="term" onChange={handleChange} type="text" />
                            <button onClick={cancelSearch}
                                className='btn-side-nav-search-close'><GrClose className='svg icon-svg' />
                            </button></form>}
                    </div>
                </div>
                <hr />
                {newBoards &&
                    <div className="nav-board-list">
                        {newBoards.map(board =>
                            <NavBoardPreview setCurrBoard={setCurrBoard}
                                board={board}
                                key={board._id}
                                boards={newBoards}
                                setNewBoards={setNewBoards} />)}
                    </div>}
                {isAddBoard &&
                    <AddBoardModal setIsAddBoard={setIsAddBoard}
                        isAddBoard={isAddBoard} />}
            </Fragment>}
    </section>
}




const NavBoardPreview = ({ board, setCurrBoard, boards }) => {
    const [modalName, setModalName] = useState(null)
    const dispatch = useDispatch()
    const [isRenaming, setIsRenaming] = useState(false)
    const [renameBoard, handleChange] = useForm({ title: board.title })

    const openBoardSettings = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        setTimeout(() => {
            setModalName('SIDE_NAV_MENU')
        }, 100);

    }

    const onRenameBoard = (ev) => {
        ev.preventDefault()
        setModalName(null)
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
            {modalName && <PopUpModal setCurrBoard={setCurrBoard} setModalName={setModalName} modalName={modalName} board={board} boards={boards} setIsRenaming={setIsRenaming} isRenaming={isRenaming} />}
        </NavLink>
    )
}

// const NavFavoritesPreview = ({ boardId, setCurrBoard, boards }) => {

//     const board = boards.filter(board => board._id === boardId)
//     if (!board) return

//     const [isRenaming, setIsRenaming] = useState(false)
//     const [renameBoard, handleChange] = useForm({ title: board.title })

//     const openBoardSettings = (ev) => {
//         ev.preventDefault()
//         ev.stopPropagation()
//         setTimeout(() => {
//             setModalName('SIDE_NAV_MENU')
//         }, 100);

//     }

//     const onRenameBoard = (ev) => {
//         ev.preventDefault()
//         setModalName(null)
//         board = { ...board, ...renameBoard }
//         setIsRenaming(!isRenaming)
//         dispatch(updateBoard(board))
//     }

//     if (isRenaming) return <form className="rename-board" onSubmit={onRenameBoard} onBlur={onRenameBoard}>
//         <BoardIcon />
//         <input autoFocus type="text" name='title' value={renameBoard.title} onChange={handleChange} />
//     </form>
//     return (
//         <NavLink to={`/workspace/board/${board._id}`} className="nav-board-preview">
//             <BoardIcon />
//             <p className="nav-board-title">{board.title}</p>
//             <button className='btn btn-svg'><MenuIcon onClick={openBoardSettings} /></button>
//             {modalName && <PopUpModal setCurrBoard={setCurrBoard} setModalName={setModalName} modalName={modalName} board={board} boards={boards} setIsRenaming={setIsRenaming} isRenaming={isRenaming} />}
//         </NavLink>
//     )
// }
