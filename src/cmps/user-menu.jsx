import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as LogoutSvg } from '../assets/icons/logout.svg'
import { closeModals } from '../store/board/board.action'
import { logout } from '../store/user/user.action'

export const UserMenu = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLogout = () => {
        dispatch(closeModals())
        dispatch(logout())
        navigate('/')
    }

    return <section className="user-menu">
        <button className='btn btn-svg btn-logout' onClick={() => onLogout()}><LogoutSvg />Logout</button>
    </section>
}