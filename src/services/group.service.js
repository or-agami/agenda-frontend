import { boardService } from "./board.service";
import { httpService } from "./http.service"
import { utilService } from "./util.service";

export const groupService = {
  getById,
  save,
  update,
  remove,
}

//?- Dev:
const STORAGE_KEY = 'boardDB'
//?- Prod:
// const BASE_URL = 'board/'

async function getById({groupId, boardId}) {
  //?- Dev:
  // const group = 
  const board = await boardService.getById(boardId)
  console.log('board:', board)
  return board.groups.find(g => g.id === groupId)
  //?- Prod:
  // return httpService.get(BASE_URL + boardId)
}

async function remove({groupId, boardId}) {
  //?- Dev:
  const board = await boardService.getById(boardId)
  // Todo: add user activity
  board.groups = board.groups.filter(g => g.id !== groupId)
  return boardService.update(board)
  //?- Prod:
  // return httpService.delete(BASE_URL + boardId)
}

async function update({group, boardId}) {
  const board = await boardService.getById(boardId)
  // Todo: add user activity
  board.groups = board.groups.map(g => (g.id !== group.id) ? g : group)
  return boardService.update(board)
}

async function save({group, boardId}) {
  const board = await boardService.getById(boardId)
  // Todo: add user activity
  board.groups.push({ id: utilService.makeId(), ...group })
  return boardService.update(board)
}