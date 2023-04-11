import { useMutation, useQueryClient, useQuery } from "react-query"
import { useParams, useNavigate } from "react-router-dom"
import { getSoloTask, editTask } from "../api/tasks"
import { Formik, Field, Form } from 'formik';

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
      queryClient.invalidateQueries({ queryKey: ['tasks']})
    },
    onError: (error) => {
      alert(error.message)
    }
  })

  if (!task) {
    return <div>Task not found</div>
  }
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div> Error: {error.message} </div>

  return (
    <div>
      <h1>{task.title}</h1>
      <Formik
        initialValues={{
          title: task.title,
          completed: task.completed,
        }}
        onSubmit={(values) => {
          editTaskMutation.mutate({ ...task, ...values})
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
    </div>
  )
}

export default EditTask
