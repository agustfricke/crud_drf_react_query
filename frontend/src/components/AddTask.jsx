import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { addTask } from "../api/tasks"
import { useNavigate } from "react-router-dom"

const AddTask = () => {

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const [title, setTitle] = useState('')

  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks']})
    },
    onError: (error) => {
      alert(error.message)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    addTaskMutation.mutate({ title, completed: false})
    setTitle('')
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <button>
        Add Task
      </button>
    </form>
  )
}

export default AddTask
