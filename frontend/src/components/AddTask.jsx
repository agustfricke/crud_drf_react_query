import { useMutation, useQueryClient } from "react-query"
import { addTask } from "../api/tasks"
import { useNavigate } from "react-router-dom"
import { Formik, Field, Form } from 'formik';
import { AiFillPlusSquare } from "react-icons/ai";
import toast from 'react-hot-toast';

const AddTask = () => {

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Task added!')
    },
    onError: (error) => {
     Tasks.error(error)
    }
  })

  return (
    <div className="mt-11">
    <h1 className="text-slate-200 text-center text-xl font-bold">Add Task</h1>
    <Formik

      initialValues={{
        title: "",
        completed: false
      }}

      onSubmit={(values) => {
        addTaskMutation.mutate({ ...values })
        navigate('/')
      }}

    >
      <Form className='flex justify-center'>

        <Field className='rounded-lg p-1.5 m-5 outline-none' id="title" name="title" placeholder="Title" />

          <Field type="checkbox" name="completed" id="completed" className="w-5" />

          <button type="submit" className='text-slate-200 hover:text-white ml-5'><AiFillPlusSquare size={30}/></button>

      </Form>
    </Formik>
    </div>
  )
}

export default AddTask
