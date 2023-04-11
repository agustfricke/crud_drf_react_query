import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { getSoloTask } from "../api/tasks"

const SoloTask = () => {

  const { id } = useParams()

  const { data: task, 
          isLoading, 
          isError,
          error } = useQuery({ 
                    queryKey: ['tasks', id],
                    queryFn: () => getSoloTask(id)
                    })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div> Error: {error.message} </div>

  return (
    <>
    <h1> {task.title} </h1>
    </>


  )
}

export default SoloTask 
