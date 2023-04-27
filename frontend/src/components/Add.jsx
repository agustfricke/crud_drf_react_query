import { useMutation } from "react-query"
import { addTask } from "../api/tasks"
import { useNavigate } from "react-router-dom"
import { Formik, Field, Form } from 'formik';
import { AiFillPlusSquare } from "react-icons/ai";
import toast from 'react-hot-toast';

const Add = () => {

  const navigate = useNavigate()

  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      toast.success('Task added successfully')
      navigate('/')
    }, 
    onError: (error) => {
      toast.error(error.message)
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
        addTaskMutation.mutate(values)
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

export default Add
