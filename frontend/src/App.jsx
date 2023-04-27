import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Tasks from './components/Tasks'
import Add from './components/Add'
import SoloTask from './components/SoloTask'
import EditTask from './components/EditTask'

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Layout />}>

          <Route index element={<Tasks />} />
          <Route path='/add' element={<Add/>} />
          <Route path=':id' element={<SoloTask/>} />
          <Route path='/edit/:id' element={<EditTask/>} />


        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
