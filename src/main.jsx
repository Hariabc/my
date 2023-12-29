import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
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
import Services from './pages/service.jsx'
import Contact from './pages/contact.jsx'
import Loginlaylout from './pages/Loginlaylout.jsx'
import ClientForm from './REGISTER/Client-register.jsx'
import AdvocateForm from './REGISTER/Advocate-register.jsx'
import SetPassword from './components/SetPassword.jsx'
import PaymentComponent from './dashborad-components/payment.jsx'
import AdvocateList from './dashborad-components/AdvoacateList.jsx'
import EventForm from './Features/EventForm.jsx'

import VideoConference from './Features/Video_Conference/VideoConference.jsx';
import JudgeConference from './Features/JudgeConference.jsx'
import Conference from './Features/Video_Conference/Conference.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='About' element={<About/>}/>
        <Route path='Login' element={<LoginPage/>}/>
        {/* <Route path='Register' element={<RegisterPage/>}/> */}
        <Route path='services' element={<Services/>}/>
        <Route path='contact' element={<Contact/>}/>
        <Route path='loginlayout' element={<Loginlaylout/>}/>
        <Route path='clientr' element={<ClientForm/>}/>
        <Route path='advocater' element={<AdvocateForm/>}/>
        <Route path="/set-password/:token" element={<SetPassword/>} />
      </Route>
      <Route path=''> 
        <Route path='/clientdashboard' element={<Clientdashboard/>}/>
        <Route path='/advocatedashboard' element={<AdvocateDashboard/>}/>
        <Route path='/judgedashboard' element={<Judgedashboard/>}/>
        <Route path='/admindashboard' element={<COAdashboard/>}/>
        <Route path='/payment' element={<PaymentComponent/>}/>
        <Route path='/advocatelist' element={<AdvocateList/>}/>
        <Route path='/scheduling-calendar' element={<EventForm/>}/>
        <Route path='/pre-trial' element={<VideoConference/>}/>
        <Route path='/schedule-pre-trial' element={<JudgeConference/>}/>
        <Route path='/conference/:meetingId' element={<Conference />} />

      </Route>
      </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
