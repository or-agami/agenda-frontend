import { showSuccessMsg } from '../../services/event-bus.service'
import { reviewService } from '../../services/review.service'
import { userService } from '../../services/user.service'
import { msgService } from '../../services/msg.service'

// Action Creators
export function getActionAddMsg(msg) {
  return { type: 'ADD_MSG', msg }
}

export function loadMsgs(toyId) {
  return async dispatch => {
    try {
      const msgs = await msgService.query(toyId)
      dispatch({ type: 'SET_MSGS', msgs })

    } catch (err) {
      console.log('MsgActions: err in loadMsgs', err)
    }
  }
}

export function addMsg(review) {
  return async dispatch => {
    try {
      const addedMsg = await msgService.add(review)
      dispatch(getActionAddMsg(addedMsg))

    } catch (err) {
      console.log('MsgActions: err in addMsg', err)
      throw err
    }
  }
}