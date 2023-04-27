import { getSoloTask, editTask } from "../api/tasks"
import { useQuery, useMutation } from "react-query"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Formik, Field, Form } from 'formik';
import Loader from "./Loader"
import toast from "react-hot-toast"
import { AiFillEdit } from "react-icons/ai";

const EditTask = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const { data: task, isLoading, isError, error } = useQuery({
    queryKey: ['soloTask', id],
    queryFn: () => getSoloTask(id),
  })


  const editTaskMutation = useMutation({
    mutationFn: editTask,
    onSuccess: () => {
      toast.success('Task edited successfully')
      navigate('/')
    }, 
    onError: (error) => {
      toast.error(error.message)
    }
  })

  if(!task) return <h2 className="text-white">Not Found</h2>

  if(isLoading) return <Loader/>
  if(isError) return toast.error(error.message)

  return (
    <Formik

      initialValues={{
        title: task.title,
        completed: task.completed
      }}

      onSubmit={(values) => {
        console.log(values)
        editTaskMutation.mutate({id: task.id, ...values})
      }}

    >
      <Form className='flex justify-center'>

        <Field className='rounded-lg p-1.5 m-5 outline-none' id="title" name="title" placeholder="Title" />

          <Field type="checkbox" name="completed" id="completed" className="w-5" />

          <button type="submit" className='text-slate-200 hover:text-white ml-5'><AiFillEdit size={30} /></button>

      </Form>
    </Formik>
  )
}

export default EditTask
