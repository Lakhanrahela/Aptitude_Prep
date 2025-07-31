import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Master from './Layout/Master'
import Home from './User/Home'
import About from './User/About'
import Contact from './User/Contact'
import Categories from './User/Categories'
import AdminMaster from './Layout/AdminMaster'
import Dashboard from './Admin/Dashboard'
import { ToastContainer } from 'react-toastify'
import AddCategories from './Admin/AddCategories'
import Register from './Authentication/Register'
import Login from './Authentication/Login'
import AdminLogin from './Authentication/AdminLogin'
import ManageCategories from './Admin/ManageCategories'
import AddQuestions from './Admin/AddQuestions'
import ManageQuestions from './Admin/ManageQuestions'
import UpdateCategories from './Admin/UpdateCategories'
import UpdateQuestions from './Admin/UpdateQuestions'
import Questions from './User/Questions'
import Tutorials from './User/Tutorials'
import Feedback from './User/Feedback'
import AddTutorials from './Admin/AddTutorials'
import ManageTutorials from './Admin/ManageTutorials'
import UpdateTutorials from './Admin/UpdateTutorials'
import ViewFeedbacks from './Admin/ViewFeedbacks'
import CustomerQueries from './Admin/CustomerQueries'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Master/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/questions/:id' element={<Questions/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/adminlogin' element={<AdminLogin/>}/>
      <Route path='/tutorials/:id' element={<Tutorials/>}/>
      <Route path='/feedback' element={<Feedback/>}/>
      </Route>

      <Route path='/admin' element={<AdminMaster/>}>
      <Route path='/admin' element={<Dashboard/>}/>
      <Route path='/admin/addcategories' element={<AddCategories/>}/>
      <Route path='/admin/managecategories' element={<ManageCategories/>}/>
      <Route path='/admin/updatecategories/:id' element={<UpdateCategories/>}/>
      <Route path='/admin/addquestions' element={<AddQuestions/>}/>
      <Route path='/admin/managequestions' element={<ManageQuestions/>}/>
      <Route path='/admin/updatequestions/:id' element={<UpdateQuestions/>}/>
      <Route path='/admin/addtutorials' element={<AddTutorials/>}/>
      <Route path='/admin/managetutorials' element={<ManageTutorials/>}/>
      <Route path='/admin/updatetutorials/:id' element={<UpdateTutorials/>}/>
      <Route path='/admin/viewfeedback' element={<ViewFeedbacks/>}/>
      <Route path='/admin/queries' element={<CustomerQueries/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    <ToastContainer/>
    </>
  )
}

export default App
