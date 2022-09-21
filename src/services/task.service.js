import { groupService } from "./group.service";
import { httpService } from "./http.service"
import { userService } from "./user.service";
import { utilService } from "./util.service";

export const taskService = {
  query,
  getById,
  save,
  update,
  remove,
}

//?- Dev:
// const STORAGE_KEY = 'taskDB'
//?- Prod:
const BASE_URL = 'task/'

async function query(filterBy) {
  //?- Prod:
  if (filterBy) return httpService.get(BASE_URL, filterBy)
  else return httpService.get(BASE_URL)
}

async function getById(taskId) {
  //?- Dev:
  // const group = await groupService.getById({groupId, boardId})
  // const task = group.tasks.find((t) => t.id === taskId)
  // return task
  //?- Prod:
  console.log(taskId)
  return httpService.get(BASE_URL + taskId)
}

async function remove({ taskId, groupId, boardId }) {
  const group = await groupService.getById({ groupId, boardId })
  group.tasks = group.tasks.filter((t) => t.id !== taskId)
  return groupService.update({ group, boardId })
}

async function update({ task, groupId, boardId }, activity) {

  // In Progress: add user activity to the task 
  // task = addActivity(task, activity)
  const group = await groupService.getById({ groupId, boardId })
  group.tasks = group.tasks.map((t) => (t.id !== task.id) ? t : task)
  return groupService.update({ group, boardId })
}

async function save({ title, groupId, boardId }) {
  const group = await groupService.getById({ groupId, boardId })
  // Todo: add user activity to the task
  console.log('title from taskService:', title)
  const task = { id: utilService.makeId(), title }
  group.tasks.push(task)
  return groupService.update({ group, boardId })
}

 // In Progress: add user activity to the task 
// function addActivity(task, activity) {
//   const newActivity = {
//     id: utilService.makeId(),
//     type: activity.type,
//     createdAt: Date.now,
//     byMember: userService.getLoggedinUser()
//   }

//   if (!task.activities) task.activities = [newActivity]
//   else task.activities.unshift(newActivity)

//   return task
// }