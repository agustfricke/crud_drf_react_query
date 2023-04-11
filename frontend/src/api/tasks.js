import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
})

export const getTasks = async () => {
  const res = await api.get('/tasks/')
  return res.data
}

export const getSoloTask = async (id) => {
  const res = await api.get(`/tasks/${id}`)
  return res.data
}

export const addTask = async (task) => {
  return await api.post('/tasks/', task)
}

export const editTask = async (task) => {
  return await api.put(`/tasks/${task.id}/`, task)
}

export const deleteTask = async (id) => {
  return await api.delete(`/tasks/${id}`)
}
