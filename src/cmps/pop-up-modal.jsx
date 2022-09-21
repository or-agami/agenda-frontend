import { useEffect } from 'react'
import { ReactComponent as Trash } from '../assets/icons/trash-icon.svg'

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
    <section className="task-menu modal">
      <button onClick={(ev) => ev.stopPropagation()} className='btn btn-svg btn-trash-task'><Trash /> Hello</button>
    </section>
  )
}
