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

function getById(boardId) {
  //?- Dev:
  // return boardService.get(STORAGE_KEY, boardId)
  //   .then((board) => {
  //     if (!board) {
  //       board = gBoards.find(board => board.id === boardId)
  //       boardService.postMany(STORAGE_KEY, gBoards)
  //     }
  //     return board
  //   })
  //?- Prod:
  // return httpService.get(BASE_URL + boardId)
}

function remove(boardId) {
  //?- Dev:
  // return boardService.remove(STORAGE_KEY, boardId)
  //?- Prod:
  // return httpService.delete(BASE_URL + boardId)
}

function save(newGroup) {
  const board = store.boardModule.board
  if (newGroup.id) {
    board.groups = board.groups.map(group =>
      (group.id === newGroup.id) ? newGroup : group)
  }
  else board.groups.push({...newGroup, id: utilService.makeId()})
  return boardService.save(board)
}