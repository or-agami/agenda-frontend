import { ReactComponent as ArrowRightSvg } from '../assets/icons/agenda-arrow-icon-right.svg'
import { TaskList } from './task-list'
import { ReactComponent as BoardMenu } from '../assets/icons/board-menu.svg'
import { useState } from 'react'
import { GroupMenu } from './group-menu'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../hooks/useForm'
import { openModal, setSort, updateBoard, updateGroup } from '../store/board/board.action'
import { ReactComponent as SortArrows } from '../assets/icons/double-arrow-sort.svg'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { PopUpModal } from './pop-up-modal'


export const GroupContent = ({ group, setIsHeaderOpen, isHeaderOpen, board}) => {
    const [modalName,setModalName] = useState(null)
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [editedGroup, handleChange, setGroup] = useForm(group)
    const [isDecending, setIsDecending] = useState(false)
    const { isScreenOpen, isGroupMenuOpen, itemId } = useSelector(state => state.boardModule.modals)
    const dispatch = useDispatch()
    const [categories, setCategories] = useState(board.cmpsOrder)

    const onSetIsGroupMenuOpen = () => {
        // dispatch(openModal('isGroupMenuOpen', group.id))
        setTimeout(() => {
            setModalName('GROUP_MENU')
        }, 100);
    }

    const onSetIsHeaderOpen = ({ target }) => {
        target.classList.toggle('open')
        setIsHeaderOpen(prevState => prevState = !isHeaderOpen)
    }

    const updateGroupName = (ev) => {
        if (ev) ev.preventDefault()
        dispatch(updateGroup({ group: editedGroup, boardId: board._id }))
        setIsEditTitle(prevState => prevState = !isEditTitle)
    }

    const onSortBy = (sortBy) => {

        setIsDecending(!isDecending)

        const sort = {
            by: sortBy,
            isDecending
        }
        dispatch(setSort(sort))
    }

    const clearSort = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        dispatch(setSort(null))
    }

    const handleOnDragEnd = (ev) => {
        const updatedCategories = [...categories]
        const [draggedItem] = updatedCategories.splice(ev.source.index, 1)
        updatedCategories.splice(ev.destination.index, 0, draggedItem)

        setCategories(updatedCategories)
        board.cmpsOrder = updatedCategories
        dispatch(updateBoard(board))
    }

    return <section className="group-content">
                    <div className='group-content-title'>
                        <button className='btn btn-svg btn-task-menu' onClick={() => onSetIsGroupMenuOpen()}><BoardMenu /></button>
                        <button className="btn btn-svg  btn-arrow-down" onClick={(ev) => { onSetIsHeaderOpen(ev) }}>
                            <ArrowRightSvg className={`${group.style} no-background`} />
                        </button>
                        {!isEditTitle && <h4 onClick={() => setIsEditTitle(!isEditTitle)} className={`${group.style} no-background group-content-title-h4`}>{group.title}</h4>}
                        {isEditTitle && <form onSubmit={(ev) => updateGroupName(ev)} onBlur={updateGroupName}>
                            <input type="text" autoFocus value={editedGroup.title} name="title" onChange={handleChange} className={`${group.style} no-background`} />
                        </form>}
                    </div>

        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='group-category' direction="horizontal">
                {(droppableProvided) => {
                    return <ul ref={droppableProvided.innerRef} {...droppableProvided.droppableProps} className="group-content-header">
                        <li className={`group-content-header-color ${group.style}`}>
                        </li>
                        <li className='flex justify-center group-content-header-checkbox'>
                            <input type="checkbox" />
                        </li>
                        <li className="flex justify-center group-head-row group-content-header-item">
                            <div className="sort-container">
                                <button onClick={() => onSortBy('title')} className='btn btn-sort'> <SortArrows />
                                    <span onClick={(ev) => clearSort(ev)} className="clear-sort">clear</span>
                                </button>
                            </div>
                            <h4>Item</h4>
                        </li>
                        {categories.map((category, idx) =>
                            <Draggable key={category} draggableId={category} index={idx} >
                                {(provided, snapshot) => {
                                    return <div ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                        <DynamicCmp isDecending={isDecending}
                                            setIsDecending={setIsDecending}
                                            category={category}
                                            clearSort={clearSort}
                                        />
                                    </div>
                                }}
                            </Draggable>
                        )}
                        {droppableProvided.placeholder}
                    </ul>
                }}
            </Droppable>
        </DragDropContext>

        <div className='group-content-tasks'>
            <TaskList
                group={group}
                board={board}
            />
        </div>
        {modalName && <PopUpModal setModalName={setModalName} modalName={modalName} group={group} board={board} />}
    </section>
}




const DynamicCmp = ({ category, isDecending, setIsDecending, clearSort }) => {

    const dispatch = useDispatch()
    let text

    const isSortable = ['status', 'priority'].includes(category)

    const onSort = (sortBy) => {
        setIsDecending(!isDecending)

        const sort = {
            by: sortBy,
            isDecending
        }
        dispatch(setSort(sort))
    }
    let className = 'flex justify-center group-content-header-category'

    switch (category) {
        case 'member':
            text = `Developer`
            className += ' same-width'
            break;

        case 'status':
            text = `Status`
            className += ' same-width'

            break;
        case 'priority':
            text = `Priority`
            className += ' same-width'

            break;
        case 'lastUpdated':
            text = `Last updated`
            className += ' same-width'

            break;
        case 'attachments':
            text = `Files`
            className += ' same-width'

            break;
        case 'timeline':
            text = `Timeline`

            break;
        default:

            break;
    }

    return <li className={className}>
        {isSortable &&
            <div className="sort-container">
                <button onClick={() => onSort(category)} className='btn btn-sort'> <SortArrows />
                    <span onClick={clearSort} className="clear-sort">clear</span>
                </button>
            </div>}
        <h4>{text}</h4>
    </li>
}