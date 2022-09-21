import { useEffect, useState } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useDispatch } from 'react-redux';
import { updateTask } from '../store/board/board.action';

export const DatePicker = ({ setDatePickerIsOpen, taskTimeline, handleDateChange, task, groupId, boardId }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      document.body.addEventListener('click', closeDatePicker)
    }, 100)
    return () => {
      document.body.removeEventListener('click', closeDatePicker)
      dispatch(updateTask({ task, groupId, boardId }))
    }
  },[])

  const closeDatePicker = () => {
    setDatePickerIsOpen(false)
  }

  return (
    <div className="date-picker" onClick={(ev) => ev.stopPropagation()}>
      <DateRange
        editableDateInputs={true}
        // onChange={item => setTaskTimeline([item.selection])}
        onChange={item => handleDateChange(item.selection)}
        moveRangeOnFirstSelection={false}
        ranges={taskTimeline}
      />
    </div>
  )
}