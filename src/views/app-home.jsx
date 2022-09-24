import { Loader } from '../cmps/loader'
import { ReactComponent as AppHeaderSvg } from '../assets/icons/app-header-background.svg'
import { ReactComponent as ArrowRightSvg } from '../assets/icons/agenda-arrow-icon-right.svg'
import fistBumpGif from '../assets/img/fist-bump.gif'
import { useState } from 'react'
import { BoardList } from '../cmps/board-list'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { SideNavBar } from '../cmps/side-nav-bar'
import { updateUser } from '../store/user/user.action'


export const AppHome = () => {

    const loggedinUser = useSelector(state => state.userModule.loggedinUser)

    // console.log('loggedinUser:', loggedinUser)
    return (
        <section className="app-home main-layout-app-home">
            <Header loggedinUser={loggedinUser} />
            <section className='main-panel-container'>
                <Inbox />
                <Favorites loggedinUser={loggedinUser} />
                <MyBoards />
            </section>
        </section>
    )
}
// Header
const Header = ({loggedinUser}) => {
    return (
        <header className="app-home-header">
            <div className='header-container'>
                <h2>Good morning, {loggedinUser ? loggedinUser.fullname : 'User'}!</h2>
                <h1>Let's start the day off right :{')'}</h1>
            </div>
            <AppHeaderSvg />
        </header>
    )
}
//Inbox
const Inbox = () => {
    const [isInboxOpen, setIsInboxOpen] = useState(true)
    const onInboxOpen = ({ target }) => {
        target.classList.toggle('open')
        setIsInboxOpen(!isInboxOpen)
    }
    return <section className='app-home-inbox'>
        <div className='app-home-inbox-header'>
            <ArrowRightSvg onClick={(ev) => onInboxOpen(ev)} />
            <h1>Inbox</h1>
        </div>
        <div className='app-home-inbox-content'>
            {isInboxOpen && <InboxContent />}

        </div>
    </section>
}

const InboxContent = () => {
    return <div className='app-home-inbox-content-container'>
        <img src={fistBumpGif} width={320} height={320} alt="" />
        <p>Fist Bumb!</p>
        <p>Your inbox is empty, We'll let you know when we get news</p>
    </div>
}
// Recent
const Recent = () => {
    const [isRecentOpen, setIsRecentOpen] = useState(true)
    const onRecentOpen = ({ target }) => {
        target.classList.toggle('open')
        setIsRecentOpen(!isRecentOpen)
    }
    return <section className='app-home-recent'>
        <div className='app-home-recent-header'>
            <ArrowRightSvg onClick={(ev) => onRecentOpen(ev)} />
            <h1>Favorites</h1>
        </div>
        <div className='app-home-recent-content'>
            {isRecentOpen && <FavoriteContent />}
        </div>
    </section>
}

const FavoriteContent  = () => {
    return <div className='app-home-recent-content-container'>

    </div>
}
// MyBoards
const MyBoards = () => {

    const { boards } = useSelector(state => state.boardModule)

    const [isMyboardsOpen, setIsMyboardsOpen] = useState(true)
    const onMyboardsOpen = ({ target }) => {
        target.classList.toggle('open')
        setIsMyboardsOpen(!isMyboardsOpen)
    }

    return <section className='app-home-myboards'>

        <div className='app-home-myboards-header'>
            <ArrowRightSvg onClick={(ev) => onMyboardsOpen(ev)} />
            <h1>My boards</h1>
        </div>
        {isMyboardsOpen && boards && <BoardList boards={boards} />}
    </section>
}