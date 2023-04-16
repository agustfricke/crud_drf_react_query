import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { getSoloTask } from "../api/tasks"
import Loader from "./Loader"
import { toast } from "react-hot-toast"

const SoloTask = () => {

  const { id } = useParams()

  const { data: task, 
          isLoading, 
          isError,
          error } = useQuery({ 
                    queryKey: ['task', id],
                    queryFn: () => getSoloTask(id)
                    })

  if (isLoading) return <Loader/>
  if (isError) return toast.error(error.message)

  return (
    <>
    <div className="bg-sky-950 p-4 m-4  rounded-md">
          <header className="flex justify-between" >
            <p className="m-2 text-slate-200 ">{task.title}</p>
          </header>
        </div>
    </>


  )
}

export default SoloTask 
