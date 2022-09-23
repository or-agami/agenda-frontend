import { Fragment, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom';
import { AppHome } from '../views/app-home'
import { Board } from '../views/board'
import { Inbox } from '../views/inbox';
import { ReactComponent as BoardSvg } from '../assets/icons/nav-bar/board.svg';
import { ReactComponent as NotificationSvg } from '../assets/icons/nav-bar/notification.svg';
import { ReactComponent as InboxSvg } from '../assets/icons/nav-bar/inbox.svg';
import { ReactComponent as MyWorkSvg } from '../assets/icons/nav-bar/my-work.svg';
import { ReactComponent as FavoritesSvg } from '../assets/icons/nav-bar/favorites.svg';
import { ReactComponent as InviteSvg } from '../assets/icons/nav-bar/invite.svg';
import { ReactComponent as SearchSvg } from '../assets/icons/nav-bar/search.svg';
import { ReactComponent as HelpSvg } from '../assets/icons/nav-bar/help.svg';
import { ReactComponent as MenuSvg } from '../assets/icons/nav-bar/menu.svg';
import { ReactComponent as AgendaLogoSvg } from '../assets/icons/agenda-logo-color.svg';
import { SideNavBar } from './side-nav-bar';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from './loader';
import { loadBoard, loadBoards, setLoader } from '../store/board/board.action';
import { Dashboard } from '../views/dashboard';
import { PopUpModal } from './pop-up-modal';


export const NavBar = () => {

  const dispatch = useDispatch()
  const { board, boards } = useSelector(state => state.boardModule)
  const params = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [currBoard, setCurrBoard] = useState(board)
  const [modalName, setModalName] = useState(null)

  useEffect(() => {
    if (board && !currBoard) setCurrBoard(board)
    if (!boards || boards.length <= 0) {
      dispatch(setLoader())
      dispatch(loadBoards())
    }
    if (boards.length > 0 && !board) {
      if (!params.boardId) {
        dispatch(loadBoard(boards[0]._id))
      }
      else {
        dispatch(setLoader())
        dispatch(loadBoard(params.boardId))
      }
      setCurrBoard(boards[0])
    }
  }, [boards, board])

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.setProperty('--board-grid-column', '317px')
    }
    else {
      document.documentElement.style.setProperty('--board-grid-column', `${(params['*'] !== 'home') ? '96px' : '66px'}`)
    }
    return (() => document.documentElement.style.removeProperty('--board-grid-column'))
  }, [isOpen, params])

  const openUserMenu = () => {
    setTimeout(() => {
      setModalName('USER_MENU')
    }, 100);
  }

  if (!currBoard) return <Loader />
  return (
    <Fragment>
      {params['*'] !== 'home' &&
        <SideNavBar setCurrBoard={setCurrBoard} boards={boards} board={currBoard} isOpen={isOpen} setIsOpen={setIsOpen} />}
      <section className="nav-bar">
        <button className="btn btn-home">
          <NavLink onClick={() => setIsOpen(false)} to="/workspace/home"><AgendaLogoSvg />
            <div className="selected-indication"></div>
          </NavLink>
        </button>
        <div className="divider-horizontal"></div>
        <button className="btn btn-board">
          <NavLink to={`/workspace/board/${currBoard._id}`} className={`${params.boardId ? 'active' : ''}`}><BoardSvg />
            <div className="selected-indication"></div>
          </NavLink>
        </button>
        <button className="btn btn-svg btn-notification"><NotificationSvg /></button>
        <button className="btn btn-svg btn-index">
          <NavLink to="/workspace/inbox"><InboxSvg />
            <div className="selected-indication"></div>
          </NavLink>
        </button>
        <button className="btn btn-svg btn-my-work"><MyWorkSvg /></button>
        <button className="btn btn-svg btn-favorites"><FavoritesSvg /></button>
        <button className="btn btn-svg btn-invite"><InviteSvg /></button>
        <button className="btn btn-svg btn-search"><SearchSvg /></button>
        <button className="btn btn-svg btn-help"><HelpSvg /></button>
        <div className="divider-horizontal"></div>
        <button className="btn btn-svg btn-menu"><MenuSvg /></button>
        {modalName && <PopUpModal setModalName={setModalName} modalName={modalName} />}
        <button className="btn btn-svg btn-user" onClick={() => openUserMenu()}>O</button>


      </section>
      <Routes>
        <Route path="/home" element={<AppHome />} />
        <Route path="/board/dashboard/:boardId" element={<Dashboard />} />
        <Route path="/board/:boardId/*" element={<Board />} />
        <Route path="/inbox" element={<Inbox />} />
      </Routes>
    </Fragment>
  )
}

