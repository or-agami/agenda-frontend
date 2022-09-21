import { useEffect } from 'react'
import { ReactComponent as Trash } from '../assets/icons/trash-icon.svg'
import { DatePicker } from './date-picker'

export const PopUpModal = ({ setMenuModalIsOpen }) => {

  const closeModal = () => {
    setMenuModalIsOpen(false)
  }

  useEffect(() => {
    setTimeout(() => {
      document.body.addEventListener('click', closeModal)
    }, 100)
    return () => {
      document.body.removeEventListener('click', closeModal)
    }
  })
  return (
    <section className="task-menu modal" onClick={(ev) => ev.stopPropagation()}>
      <button onClick={() => console.log('hello from modal')} className='btn btn-svg btn-trash-task'><Trash /> Hello</button>
    </section>
  )
}
