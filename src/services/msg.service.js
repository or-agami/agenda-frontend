import { getActionAddMsg } from "../store/msg/msg.action"
import { store } from "../store/store"
import { httpService } from "./http.service"
import { socketService } from "./socket.service"


/*?- WebSocket */;
(() => {
  socketService.on(SOCKET_EVENT_ADD_MSG, (msg) => {
    console.log('GOT msg from socket', msg)
    store.dispatch(getActionAddMsg(msg))
  })
})()

export const msgService = {
  query,
  add,
}

const BASE_URL = 'msg/'

function query(toyId) {
  if (toyId) {
    return httpService.get(BASE_URL, toyId)
  }
  else return httpService.get(BASE_URL)
}

function add(toyId) {
  return httpService.get(BASE_URL + toyId)
}