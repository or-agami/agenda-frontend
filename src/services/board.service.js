// import { store } from "../store/store";
import { storageService } from "./async-storage.service";
// import { httpService } from "./http.service"
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
      "_id": "u103",
      "fullname": "Or Agami",
      "imgUrl": "profile-img-or"
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
        "fullname": "Tal Ben Atiya",
        "imgUrl": "profile-img-tal"
      },
      {
        "_id": "u102",
        "fullname": "Gal Wender",
        "imgUrl": "profile-img-gal"
      },
      {
        "_id": "u103",
        "fullname": "Or Agami",
        "imgUrl": "profile-img-or"
      }
    ],
    "groups": [
      {
        "id": "g101",
        "title": "Design",
        "archivedAt": 1589983468418,
        "tasks": [
          {
            "id": "c101",
            "title": "Nav bar"
          },
          {
            "id": "c102",
            "title": "Home page"
          },
          {
            "id": "gSmpvT",
            "title": "Loader animation"
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
                  "_id": "u103",
                  "fullname": "Or Agami",
                  "imgUrl": "profile-img-or"
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
                  "_id": "u103",
                  "fullname": "Or Agami",
                  "imgUrl": "profile-img-or"
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
              "_id": "u103",
              "fullname": "Or Agami",
              "imgUrl": "profile-img-or"
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
          "_id": "u103",
          "fullname": "Or Agami",
          "imgUrl": "profile-img-or"
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
      "_id": "u103",
      "fullname": "Or Agami",
      "imgUrl": "profile-img-or"
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
        "_id": "u103",
        "fullname": "Or Agami",
        "imgUrl": "profile-img-or"
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
                  "_id": "u103",
                  "fullname": "Or Agami",
                  "imgUrl": "profile-img-or"
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
                  "_id": "u103",
                  "fullname": "Or Agami",
                  "imgUrl": "profile-img-or"
                }
              }
            ],
            "memberIds": [
              "u103"
            ],
            "labelIds": [
              "l101",
              "l102"
            ],
            "createdAt": 1590999730348,
            "dueDate": 16156215211,
            "byMember": {
              "_id": "u103",
              "fullname": "Or Agami",
              "imgUrl": "profile-img-or"
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
          "_id": "u103",
          "fullname": "Or Agami",
          "imgUrl": "profile-img-or"
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
    "_id": "tuUXJ",
    "title": "agenda",
    "members": [
      {
        "_id": "u101",
        "fullname": "Tal Ben Atiya",
        "imgUrl": "profile-img-tal"
      },
      {
        "_id": "u102",
        "fullname": "Gal Wender",
        "imgUrl": "profile-img-gal"
      },
      {
        "_id": "u103",
        "fullname": "Or Agami",
        "imgUrl": "profile-img-or"
      }
    ],
    "groups": [
      {
        "id": "u5Ww3G",
        "title": "Design",
        "tasks": [
          {
            "id": "6GcnqY",
            "title": "Nav bar",
            "status": "Working on it",
            "priority": "Critical ⚠",
            "memberIds": [
              "u101",
              "u102",
              "u103"
            ]
          },
          {
            "id": "JooqqA",
            "title": "Home page",
            "status": "Done",
            "priority": "Medium",
            "memberIds": [
              "u101",
              "u102",
              "u103"
            ]
          },
          {
            "id": "woFH9w",
            "title": "Loader animation",
            "status": "Need help",
            "priority": "High",
            "memberIds": [
              "u101",
              "u102",
              "u103"
            ]
          },
          {
            "id": "xc4QYw",
            "title": "Media queries",
            "status": "Stuck",
            "priority": "Medium",
            "memberIds": [
              "u101",
              "u102",
              "u103"
            ]
          },
          {
            "id": "LpuFi9",
            "title": "Admin deashboard",
            "status": "Waiting for QA",
            "priority": "Low",
            "memberIds": [
              "u101",
              "u102",
              "u103"
            ]
          }
        ]
      },
      {
        "id": "LTOP3z",
        "title": "Development",
        "tasks": [
          {
            "id": "CGRT4E",
            "title": "CRUD",
            "status": "Done",
            "priority": "Critical ⚠",
            "memberIds": [
              "u102",
              "u103"
            ]
          },
          {
            "id": "55BKFX",
            "title": "REST API routing",
            "status": "Working on it",
            "priority": "High",
            "memberIds": [
              "u101"
            ]
          },
          {
            "id": "HdzYV1",
            "title": "Data base connection",
            "status": "Waiting for QA",
            "priority": "Low",
            "memberIds": [
              "u102",
              "u103"
            ]
          },
          {
            "id": "M4qCwx",
            "title": "Cache service",
            "status": "Working on it",
            "priority": "Medium",
            "memberIds": [
              "u102"
            ]
          },
          {
            "id": "Su8fOZ",
            "title": "Socket service",
            "status": "Need help",
            "memberIds": [
              "u102"
            ]
          },
          {
            "id": "ggpA9r",
            "title": "PWA",
            "status": "Pending",
            "priority": "Low",
            "memberIds": [
              "u103"
            ]
          }
        ]
      },
      {
        "id": "vnVT6u",
        "title": "QA",
        "tasks": [
          {
            "id": "2ChAvJ",
            "title": "Group Invites",
            "status": "Done",
            "priority": "Low",
            "memberIds": [
              "u101"
            ]
          },
          {
            "id": "qxvCiE",
            "title": "Page navigation",
            "status": "Done",
            "priority": "Medium",
            "memberIds": [
              "u103"
            ]
          },
          {
            "id": "PrNsii",
            "title": "Login and Signup",
            "status": "Done",
            "priority": "Medium",
            "memberIds": [
              "u101"
            ]
          },
          {
            "id": "Zl4r6y",
            "title": "Task management",
            "status": "Working on it",
            "priority": "High",
            "memberIds": [
              "u102"
            ]
          },
          {
            "id": "wyGTCe",
            "title": "Search",
            "status": "Working on it",
            "priority": "Medium",
            "memberIds": [
              "u103"
            ]
          },
          {
            "id": "lF92Hc",
            "title": "Profile",
            "status": "Stuck",
            "priority": "Medium",
            "memberIds": [
              "u101"
            ]
          },
          {
            "id": "qQJOmp",
            "title": "Database",
            "status": "Done",
            "priority": "Low",
            "memberIds": [
              "u103"
            ]
          },
          {
            "id": "X8CdG0",
            "title": "Inbox / Notification",
            "status": "Working on it",
            "priority": "Medium",
            "memberIds": [
              "u102"
            ]
          },
          {
            "id": "jWkZ32",
            "title": "My work page",
            "status": "Need help",
            "priority": "High",
            "memberIds": [
              "u102"
            ]
          },
          {
            "id": "MyE1WT",
            "title": "Task chat",
            "status": "Working on it",
            "priority": "High",
            "memberIds": [
              "u101"
            ]
          },
          {
            "id": "hwemSv",
            "title": "Timeline",
            "status": "Pending",
            "priority": "High",
            "memberIds": [
              "u103"
            ]
          },
          {
            "id": "ux1j9j",
            "title": "Drag and Drop",
            "status": "Working on it",
            "priority": "High"
          }
        ]
      },
      {
        "id": "eQiOd4",
        "title": "Deployment",
        "tasks": [
          {
            "id": "oVGzc4",
            "title": "AWS DB hosting",
            "status": "Pending"
          },
          {
            "id": "faKu7I",
            "title": "Frontend compile",
            "status": "Pending"
          },
          {
            "id": "YM0AUK",
            "title": "Docker Img build",
            "status": "Pending"
          },
          {
            "id": "wxz4Ub",
            "title": "Docker hub deployment",
            "status": "Pending"
          }
        ]
      }
    ]
  }
]

const STORAGE_KEY = 'boardDB'
//?- Prod:
// const BASE_URL = 'board/'

async function query(filterBy) {
  //?- Dev:
  let boards = await storageService.query(STORAGE_KEY)
  if (!boards || boards.length === 0) {
    boards = gBoards
    storageService.postMany(STORAGE_KEY, boards)
  }
  return boards

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
        board.groups.forEach(group => {
          if (sortBy.by === 'title') {
            group.tasks.sort((taskA, taskB) => taskA.title.localeCompare(taskB.title))
          }
          if (sortBy.isDecending) {
            group.tasks = group.tasks.reverse()
          }
        })


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