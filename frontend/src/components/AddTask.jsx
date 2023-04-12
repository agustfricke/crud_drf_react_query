import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { addTask } from "../api/tasks"
import { useNavigate } from "react-router-dom"
import { Formik, Field, Form } from 'formik';

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


  return (
      <Formik
        initialValues={{
        title: "",
          completed: false
        }}
        onSubmit={(values) => {
          addTaskMutation.mutate({ ...values})
          navigate('/')
        }}
      >
        <Form>
          <label htmlFor="title">Title</label>
          <Field id="title" name="title" placeholder="title" />

          <label>
            <Field type="checkbox" name="completed" id='completed' />
          </label>


          <button type="submit">Submit</button>
        </Form>
      </Formik>
  )
}

export default AddTask
