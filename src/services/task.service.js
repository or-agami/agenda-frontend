import { store } from "../store/store";
import { storageService } from "./async-storage.service";
import { boardService } from "./board.service";
import { groupService } from "./group.service";
import { httpService } from "./http.service"
import { utilService } from "./util.service";

export const taskService = {
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

function save(newTask) {
  let group = store.boardModule.group
  console.log('group:', group)
  const task = { id: utilService.makeId(), title: newTask.title }
  group.tasks.push(task)
  return groupService.save(group)
}