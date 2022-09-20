import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as Trash } from '../assets/icons/trash-icon.svg'
import { closeModals, openModal, removeGroup, updateGroup } from '../store/board/board.action'

export const GroupMenu = ({ group, boardId }) => {
    const dispatch = useDispatch()
    const isColorMenuOpen = useSelector(state => state.boardModule.modals.isColorMenuOpen)
    const onRemoveGroup = () => {
        const removeObj = { groupId: group.id, boardId }
        dispatch(closeModals())
        dispatch(removeGroup(removeObj))
    }

    const openColorMenu = () => {
        dispatch(openModal('isColorMenuOpen',group.id))
    }
    if (isColorMenuOpen) return <ColorMenu group={group} boardId={boardId} />
    return <section className="group-menu modal">
        <div className="group-color-icon-container" onClick={openColorMenu}>
            <div className={`group-color-icon ${group.style}`}></div>
            <button>Change group color</button>
        </div>
        <button onClick={onRemoveGroup} className='btn btn-svg btn-trash-task'><Trash /> Delete</button>
    </section>
}

const ColorMenu = ({ group, boardId}) => {
    const dispatch = useDispatch()
    const changeGroupColor = (color) => {
        let updatedGroup = { ...group, style: color }
        dispatch(closeModals())
        dispatch(updateGroup({ group: updatedGroup, boardId }))
    }

    return <section className='color-menu modal'>
        <div className='clr1' onClick={() => changeGroupColor('clr1')}></div>
        <div className='clr2' onClick={() => changeGroupColor('clr2')}></div>
        <div className='clr3' onClick={() => changeGroupColor('clr3')}></div>
        <div className='clr4' onClick={() => changeGroupColor('clr4')}></div>
        <div className='clr5' onClick={() => changeGroupColor('clr5')}></div>
        <div className='clr6' onClick={() => changeGroupColor('clr6')}></div>
        <div className='clr7' onClick={() => changeGroupColor('clr7')}></div>
        <div className='clr8' onClick={() => changeGroupColor('clr8')}></div>
        <div className='clr9' onClick={() => changeGroupColor('clr9')}></div>
        <div className='clr10' onClick={() => changeGroupColor('clr10')}></div>
        <div className='clr11' onClick={() => changeGroupColor('clr11')}></div>
        <div className='clr12' onClick={() => changeGroupColor('clr13')}></div>
        <div className='clr13' onClick={() => changeGroupColor('clr14')}></div>
        <div className='clr14' onClick={() => changeGroupColor('clr15')}></div>
        <div className='clr15' onClick={() => changeGroupColor('clr16')}></div>
        <div className='clr17' onClick={() => changeGroupColor('clr17')}></div>
        <div className='clr18' onClick={() => changeGroupColor('clr18')}></div>
        <div className='clr19' onClick={() => changeGroupColor('clr19')}></div>
        <div className='clr20' onClick={() => changeGroupColor('clr20')}></div>
        <div className='clr21' onClick={() => changeGroupColor('clr21')}></div>
        <div className='clr22' onClick={() => changeGroupColor('clr22')}></div>
        <div className='clr23' onClick={() => changeGroupColor('clr23')}></div>
        <div className='clr24' onClick={() => changeGroupColor('clr24')}></div>
        <div className='clr25' onClick={() => changeGroupColor('clr25')}></div>
        <div className='clr26' onClick={() => changeGroupColor('clr26')}></div>
        <div className='clr27' onClick={() => changeGroupColor('clr27')}></div>
    </section>
}
