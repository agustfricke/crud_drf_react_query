import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
})

export const getTasks = async () => {
  const response = await api.get("/tasks/")
  return response.data
}

export const addTask = async (data) => {
  await api.post("/tasks/", data)
}

export const getSoloTask = async (id) => {
  const response = await api.get(`/tasks/${id}/`)
  return response.data
}

export const editTask = async (data) => {
  await api.put(`/tasks/${data.id}/`, data)
}

export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}/`)
}


