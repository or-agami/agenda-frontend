import { store } from "../store/store";
import { storageService } from "./async-storage.service";
import { boardService } from "./board.service";
import { httpService } from "./http.service"
import { utilService } from "./util.service";

export const groupService = {
  getById,
  save,
  remove,
}

//?- Dev:
const STORAGE_KEY = 'boardDB'
//?- Prod:
// const BASE_URL = 'board/'

async function getById(groupId, boardId) {
  //?- Dev:
  // const group = 
  const board = await boardService.getById(boardId)
  console.log('board:', board)
  return board.groups.find(g => g.id === groupId)
  //?- Prod:
  // return httpService.get(BASE_URL + boardId)
}

function remove(boardId) {
  //?- Dev:
  // return boardService.remove(STORAGE_KEY, boardId)
  //?- Prod:
  // return httpService.delete(BASE_URL + boardId)
}

async function save(newGroup, boardId) {
  const board = await boardService.getById(boardId)
  if (newGroup.id) {
    board.groups = board.groups.map(group =>
      (group.id === newGroup.id) ? newGroup : group)
  }
  else board.groups.push({ ...newGroup, id: utilService.makeId() })
  return boardService.save(board)
}