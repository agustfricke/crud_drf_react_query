import { useMutation, useQueryClient, useQuery } from "react-query"
import { useParams, useNavigate } from "react-router-dom"
import { getSoloTask, editTask } from "../api/tasks"
import { Formik, Field, Form } from 'formik';
import { AiFillEdit } from "react-icons/ai";
import toast from 'react-hot-toast';

const EditTask = () => {

  const queryClient = useQueryClient()

  const { id } = useParams()
  const navigate = useNavigate()

  const { data: task,
    isLoading,
    isError,
    error } = useQuery({
      queryKey: ['tasks', id],
      queryFn: () => getSoloTask(id)
    })

  const editTaskMutation = useMutation({
    mutationFn: editTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Task edited!')
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  if (!task) {
    return <div>Task not found</div>
  }
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div> Error: {error.message} </div>

  return (
    <div className="mt-11">
      <h1 className="text-slate-200 text-center text-xl font-bold">Edit Task</h1>
      <Formik
        initialValues={{
          title: task.title,
          completed: task.completed,
        }}
        onSubmit={(values) => {
          editTaskMutation.mutate({ ...task, ...values })
          navigate('/')
        }}
      >
        <Form className='flex justify-center'>



          <Field className='rounded-lg p-1.5 m-5 outline-none' id="title" name="title" placeholder="Title" />

          <Field type="checkbox" name="completed" id="completed" className="w-5" />

          <button type="submit" className='text-slate-200 hover:text-white ml-5'><AiFillEdit size={30} /></button>

        </Form>
      </Formik>
    </div>
  )
}

export default EditTask
