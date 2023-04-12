import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import EditTask from './components/EditTask'
import SoloTask from './components/SoloTask'
import Layout from './components/Layout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>

        <Route index element={<Tasks/>}/>
        <Route path='/add' element={<AddTask/>}/>
        <Route path='/edit/:id' element={<EditTask/>}/>
        <Route path=':id' element={<SoloTask/>}/>
        
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
