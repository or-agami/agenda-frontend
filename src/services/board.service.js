import { store } from "../store/store";
import { storageService } from "./async-storage.service";
import { httpService } from "./http.service"

export const boardService = {
  query,
  getById,
  save,
  remove,
}
//?- Dev:
const gBoards = require("../data/board.json")
const STORAGE_KEY = 'boardDB'
//?- Prod:
// const BASE_URL = 'board/'

function query(filterBy) {
  //?- Dev:
  return storageService.query(STORAGE_KEY)
    .then((boards) => {
      if (!boards || boards.length === 0) {
        boards = gBoards
        storageService.postMany(STORAGE_KEY, boards)
      }
      return boards
    })

  //?- Prod:
  // if (filterBy) return httpService.get(BASE_URL, filterBy)
  // else return httpService.get(BASE_URL)
}

function getById(boardId) {
  //?- Dev:
  return storageService.get(STORAGE_KEY, boardId)
  //?- Prod:
  // return httpService.get(BASE_URL + boardId)
}

function remove(boardId) {
  //?- Dev:
  return storageService.remove(STORAGE_KEY, boardId)
  //?- Prod:
  // return httpService.delete(BASE_URL + boardId)
}

function save(board) {
  //?- Dev:
  if (board._id) return storageService.put(STORAGE_KEY, board)
  else return storageService.post(STORAGE_KEY, board)
  //?- Prod:
  // if (board._id) return httpService.put(BASE_URL + board._id, board)
  // else return httpService.post(BASE_URL, board)
}