import { store } from "../store/store";
import { storageService } from "./async-storage.service";
import { boardService } from "./board.service";
import { groupService } from "./group.service";
import { httpService } from "./http.service"
import { utilService } from "./util.service";

export const taskService = {
  getById,
  save,
  update,
  remove,
}

async function getById({ taskId, groupId, boardId }) {
  //?- Dev:
  const group = await groupService.getById(groupId, boardId)
  const task = group.tasks.find((t) => t.id === taskId)
  return task
  //?- Prod:
  // return httpService.get(BASE_URL + boardId)
}

async function remove({ taskId, groupId, boardId }) {
  //?- Dev:
  const group = await groupService.getById(groupId, boardId)
  group.tasks = group.tasks.filter((t) => t.id !== taskId)
  return groupService.update(group, boardId)
  //?- Prod:
  // return httpService.delete(BASE_URL + boardId)
}

async function update({ task, groupId, boardId }) {
  const group = await groupService.getById(groupId, boardId)
  // Todo: add user activity to the task
  group.tasks = group.tasks.map((t) => (t.id !== task.id) ? t : task)
  return groupService.update(group, boardId)
}

async function save({ title, groupId, boardId }) {
  const group = await groupService.getById(groupId, boardId)
  // Todo: add user activity to the task
  console.log('title from taskService:', title)
  const task = { id: utilService.makeId(), title }
  group.tasks.push(task)
  return groupService.update(group, boardId)
}