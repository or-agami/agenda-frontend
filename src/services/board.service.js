import { store } from "../store/store";
import { storageService } from "./async-storage.service";
import { httpService } from "./http.service"
import { utilService } from "./util.service";

export const boardService = {
  query,
  getById,
  save,
  update,
  remove,
}
//?- Dev:
const gBoards = [
  {
    "_id": "b101",
    "title": "Robot dev proj",
    "archivedAt": 1589983468418,
    "createdAt": 1589983468418,
    "createdBy": {
      "_id": "u101",
      "fullname": "Abi Abambi",
      "imgUrl": "http://some-img"
    },
    "style": {},
    "labels": [
      {
        "id": "l101",
        "title": "Done",
        "color": "--status-clr1"
      },
      {
        "id": "l102",
        "title": "Progress",
        "color": "--status-clr1"
      }
    ],
    "members": [
      {
        "_id": "u101",
        "fullname": "Tal Tarablus",
        "imgUrl": "https://www.google.com"
      }
    ],
    "groups": [
      {
        "id": "g101",
        "title": "Group 1",
        "archivedAt": 1589983468418,
        "tasks": [
          {
            "id": "c101",
            "title": "Replace logo"
          },
          {
            "id": "c102",
            "title": "Add Samples"
          }
        ],
        "style": {}
      },
      {
        "id": "g102",
        "title": "Group 2",
        "tasks": [
          {
            "id": "c103",
            "title": "Do that",
            "archivedAt": 1589983468418
          },
          {
            "id": "c104",
            "title": "Help me",
            "status": "in-progress",
            "description": "description",
            "comments": [
              {
                "id": "ZdPnm",
                "txt": "also @yaronb please CR this",
                "createdAt": 1590999817436,
                "byMember": {
                  "_id": "u101",
                  "fullname": "Tal Tarablus",
                  "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                }
              }
            ],
            "checklists": [
              {
                "id": "YEhmF",
                "title": "Checklist",
                "todos": [
                  {
                    "id": "212jX",
                    "title": "To Do 1",
                    "isDone": false
                  }
                ],
                "createdAt": 1590999817436,
                "byMember": {
                  "_id": "u101",
                  "fullname": "Tal Tarablus",
                  "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                }
              }
            ],
            "memberIds": [
              "u101"
            ],
            "labelIds": [
              "l101",
              "l102"
            ],
            "createdAt": 1590999730348,
            "dueDate": 16156215211,
            "byMember": {
              "_id": "u101",
              "username": "Tal",
              "fullname": "Tal Tarablus",
              "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "style": {
              "bgColor": "#26de81"
            }
          }
        ],
        "style": {}
      }
    ],
    "activities": [
      {
        "id": "a101",
        "txt": "Changed Color",
        "createdAt": 154514,
        "byMember": {
          "_id": "u101",
          "fullname": "Abi Abambi",
          "imgUrl": "http://some-img"
        },
        "task": {
          "id": "c101",
          "title": "Replace Logo"
        }
      }
    ],
    "cmpsOrder": [
      "member",
      "status",
      "priority",
      "attachments",
      "timeline"
    ]
  },
  {
    "_id": "b102",
    "title": "New dev",
    "archivedAt": 1589983468418,
    "createdAt": 1589983468418,
    "createdBy": {
      "_id": "u101",
      "fullname": "Abi Abambi",
      "imgUrl": "http://some-img"
    },
    "style": {},
    "labels": [
      {
        "id": "l101",
        "title": "Done",
        "color": "--status-clr1"
      },
      {
        "id": "l102",
        "title": "Progress",
        "color": "--status-clr1"
      }
    ],
    "members": [
      {
        "_id": "u101",
        "fullname": "Tal Tarablus",
        "imgUrl": "https://www.google.com"
      }
    ],
    "groups": [
      {
        "id": "g101",
        "title": "Group 1",
        "archivedAt": 1589983468418,
        "tasks": [
          {
            "id": "c101",
            "title": "Replace logo"
          },
          {
            "id": "c102",
            "title": "Add Samples"
          }
        ],
        "style": {}
      },
      {
        "id": "g102",
        "title": "Group 2",
        "tasks": [
          {
            "id": "c103",
            "title": "Do that",
            "archivedAt": 1589983468418
          },
          {
            "id": "c104",
            "title": "Help me",
            "status": "in-progress",
            "description": "description",
            "comments": [
              {
                "id": "ZdPnm",
                "txt": "also @yaronb please CR this",
                "createdAt": 1590999817436,
                "byMember": {
                  "_id": "u101",
                  "fullname": "Tal Tarablus",
                  "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                }
              }
            ],
            "checklists": [
              {
                "id": "YEhmF",
                "title": "Checklist",
                "todos": [
                  {
                    "id": "212jX",
                    "title": "To Do 1",
                    "isDone": false
                  }
                ],
                "createdAt": 1590999817436,
                "byMember": {
                  "_id": "u101",
                  "fullname": "Tal Tarablus",
                  "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                }
              }
            ],
            "memberIds": [
              "u101"
            ],
            "labelIds": [
              "l101",
              "l102"
            ],
            "createdAt": 1590999730348,
            "dueDate": 16156215211,
            "byMember": {
              "_id": "u101",
              "username": "Tal",
              "fullname": "Tal Tarablus",
              "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "style": {
              "bgColor": "#26de81"
            }
          }
        ],
        "style": {}
      }
    ],
    "activities": [
      {
        "id": "a101",
        "txt": "Changed Color",
        "createdAt": 154514,
        "byMember": {
          "_id": "u101",
          "fullname": "Abi Abambi",
          "imgUrl": "http://some-img"
        },
        "task": {
          "id": "c101",
          "title": "Replace Logo"
        }
      }
    ],
    "cmpsOrder": [
      "member",
      "status",
      "priority",
      "attachments",
      "timeline"
    ]
  }
]

const STORAGE_KEY = 'boardDB'
//?- Prod:
// const BASE_URL = 'board/'

function query(filterBy) {
  //?- Dev:
  return storageService.query(STORAGE_KEY)
    .then((boards) => {
      if (!boards || boards.length === 0) {
        boards = gBoards
        storageService.postMany(STORAGE_KEY, gBoards)
      }
      return boards
    })

  //?- Prod:
  // if (filterBy) return httpService.get(BASE_URL, filterBy)
  // else return httpService.get(BASE_URL)
}

function getById(boardId, sortBy, filterBy) {
  //?- Dev:
  return storageService.get(STORAGE_KEY, boardId)
    .then((board) => {
      if (!board) {
        board = gBoards.find(board => board._id === boardId)
      }
      // Todo: merge sort with filter !!
      if (sortBy) {
        if (sortBy.by === 'title') board.groups.forEach(group =>
          group.tasks.sort((taskA, taskB) => taskA.title.localeCompare(taskB.title)))
      }

      if (filterBy) {
        board.groups.map((group) =>
          group.tasks = group.tasks.filter((task) =>
            (filterBy.term) ? task.title.toLowerCase().includes(filterBy.term.toLowerCase()) : true
          )
        )
      }
      return board
    })
  //?- Prod:
  // return httpService.get(BASE_URL + boardId)
}

function remove(boardId) {
  //?- Dev:
  return storageService.remove(STORAGE_KEY, boardId)
  //?- Prod:
  // return httpService.delete(BASE_URL + boardId)
}

function update(board) {
  //?- Dev:
  if (board._id) return storageService.put(STORAGE_KEY, board)
  //?- Prod:
  // if (board._id) return httpService.put(BASE_URL + board._id, board)
  // else return httpService.post(BASE_URL, board)
}

function save(board) {
  //?- Dev:
  // Todo: board.createBy
  board.groups = [{ id: utilService.makeId(), title: 'Group 1', tasks: [] }]
  return storageService.post(STORAGE_KEY, board)
  //?- Prod:
  // if (board._id) return httpService.put(BASE_URL + board._id, board)
  // else return httpService.post(BASE_URL, board)
}