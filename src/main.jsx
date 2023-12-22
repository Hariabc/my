import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import './index.css' 
import { createBrowserRouter,createRoutesFromElements,Route, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import LoginPage from './pages/login.jsx'
// import RegisterPage from './components/Register.jsx'
import Clientdashboard from './client/Clientdashboard.jsx'
import AdvocateDashboard from './advocate/AdvocateDashboard.jsx'
import Judgedashboard from './judge/Judgedashboard.jsx'
import COAdashboard from './coa/COAdashboard.jsx'
import Services from './pages/services.jsx'
import Contact from './pages/contact.jsx'
import ClientForm from './REGISTER/Client-register.jsx'
import AdvocateForm from './REGISTER/Adocate-register.jsx'
import SetPassword from './components/SetPassword.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='' element={<Layout/>}>
        <Route path='' element={<Home/>}/>
        <Route path='About' element={<About/>}/>
        <Route path='Login' element={<LoginPage/>}/>
        {/* <Route path='Register' element={<RegisterPage/>}/> */}
        <Route path='services' element={<Services/>}/>
        <Route path='contact' element={<Contact/>}/>
        <Route path='clientr' element={<ClientForm/>}/>
        <Route path='advocater' element={<AdvocateForm/>}/>
        <Route path="/set-password/:token" element={<SetPassword/>} />
      </Route>
      <Route path=''> 
        <Route path='/clientd' element={<Clientdashboard/>}/>
        <Route path='/advocated' element={<AdvocateDashboard/>}/>
        <Route path='/judged' element={<Judgedashboard/>}/>
        <Route path='/admind' element={<COAdashboard/>}/>
      </Route>
      </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
