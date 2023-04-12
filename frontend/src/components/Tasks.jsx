import { useQuery, useQueryClient, useMutation } from "react-query"
import { getTasks, deleteTask } from "../api/tasks"
import { Link } from "react-router-dom"

const Tasks = () => {

  const queryClient = useQueryClient()

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks']})
      alert('Task deleted')
    },
    onError: (error) => {
      alert(error.message)
    }
  })

  const { data: tasks, 
          isLoading, 
          isError,
          error } = useQuery({ 
                    queryKey: ['tasks'],
                    queryFn: getTasks,
                    select: data => data.sort((a, b) => b.id - a.id)
                    })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div> Error: {error.message} </div>

  return (

    <div>
      <Link to={'/add'}> Add task </Link>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title}
            <Link to={`/edit/${task.id}`}>Edit</Link>
            <Link to={`${task.id}`}>Solo Task</Link>
            {task.completed ? 'Completed' : 'Not completed'}
            <button onClick={() => deleteTaskMutation.mutate(task.id)}>Delete Task</button>
          </li>
        ))}
      </ul>
    </div>

  )
}

export default Tasks
