import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ClientDashboard from './client/Clientdashboard';
import AdvocateDashboard from './advocate/AdvocateDashboard';
import JudgeDashboard from './judge/Judgedashboard';
import COADashboard from './coa/COAdashboard';
import ClientForm from './REGISTER/Client-register';
import AdvocateForm from './REGISTER/Advocate-register';
import SetPassword from './components/Setpassword';
import Advpassword from "./components/privateAdvpassword.jsx";
import PaymentComponent from './dashborad-components/payment.jsx'
import AdvocateList from './dashborad-components/AdvoacateList.jsx'
import FileUploader from './dashborad-components/Sendingfiles.jsx';
import EventForm from './Features/EventForm.jsx';
import VideoConference from './Features/Video_Conference/VideoConference.jsx';
import JudgeConference from './Features/JudgeConference.jsx';
import Conference from './Features/Video_Conference/Conference.jsx';
import CaseFilingForm from './dashborad-components/FileACase.jsx';
import FileACaseMin from './dashborad-components/FileACaseMin.jsx';
import HomeCon from './Features/Video_Conference/homeCon.jsx';
import Room from './Features/Video_Conference/Room.jsx';
import AdvocateConference from './Features/AdvocateConference.jsx';
import CaseTracking from './dashborad-components/CaseTracking.jsx';
import "./index.css"
import Layout from './components/Layout.jsx';
import AddUsers from './dashborad-components/AddUsers.jsx';
import Profile from './client/Profile.jsx';
import PubAdvReg from "./components/publicadvreg.jsx";
import JudgeReg from "./components/Judgereg.jsx"
import LoginPage from "./pages/login.jsx"
import { AuthProvider } from './AuthContext'; // assuming you have AuthContext set up
import Chat from './Chat/Chat.jsx';
import Apps from './Temp.jsx';

const App = () => {
  return (
    <Router>
      <AuthProvider>
      <Routes>
      <Route path='' element={<Layout/>}>
            <Route index element={<Home />}/>
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/client/register" element={<ClientForm />} />
            <Route path="/advocate/register" element={<AdvocateForm />} />
            <Route path="/client/set-password/:token" element={<SetPassword />} />
            <Route path="/advocate/set-password/:token" element={<Advpassword />} />
        </Route>
        <Route path="">
          <Route path="/clientdashboard" element={<ClientDashboard />} />
          <Route path="/advocatedashboard" element={<AdvocateDashboard />} />
          <Route path="/judgedashboard" element={<JudgeDashboard />} />
          <Route path="/admindashboard" element={<COADashboard />} />
          <Route path='/payment' element={<PaymentComponent/>}/>
          <Route path='/advocatelist' element={<AdvocateList/>}/>
          <Route path='/sendingfiles' element={<FileUploader/>}/>
          <Route path='/fileacase' element={<CaseFilingForm/>}/>
          <Route path='/fileacasemain' element={<FileACaseMin/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/addusers' element={<AddUsers/>}/>
          <Route path="/advocate/register/complete/:token" element={<PubAdvReg />} />
          <Route path="/judge/register/complete/:token" element={<JudgeReg/>} />
          <Route path='/chat' element={<Chat/>}/> 
          <Route path='/temp' element={<Apps/>}/> 
          <Route path='/casefilingform' element={<CaseFilingForm/>}/>
          <Route path='/fileacase' element={<FileACaseMin/>}/>
          <Route path='/pre-trial' element={<VideoConference/>}/>
          <Route path='/schedule-pre-trial' element={<JudgeConference/>}/>
          <Route path='/scheduling-calendar' element={<EventForm/>}/>
          <Route path="/homecon" element={<HomeCon/>}/>
          <Route path='/room/:roomID' element={<Room/>}/>
          <Route path='pre-trial-conferencing' element={<AdvocateConference/>}/>
          <Route path='/case-tracking' element={<CaseTracking/>}/>
        </Route>
      </Routes>
      </AuthProvider>
    </Router>
  );
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


