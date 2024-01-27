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

import VideoConference from './Features/Video_Conference/VideoConference.jsx';
import JudgeConference from './Features/JudgeConference.jsx';
import Conference from './Features/Video_Conference/Conference.jsx';
import CaseFilingForm from './dashborad-components/FileACase.jsx';
import FileACaseMin from './dashborad-components/FileACaseMin.jsx';
import HomeCon from './Features/Video_Conference/homeCon.jsx';
import Room from './Features/Video_Conference/Room.jsx';
import Advcauselist from './advocate/Cause_list.jsx'
import CaseTracking from './client_dashboard/CaseTracking.jsx';
import "./index.css"
import Layout from './components/Layout.jsx';
import Profile from './client/Profile.jsx';
import PubAdvReg from "./components/publicadvreg.jsx";
import JudgeReg from "./components/Judgereg.jsx"
import LoginPage from "./pages/login.jsx"
import { AuthProvider } from './AuthContext'; // assuming you have AuthContext set up
import Chat from './Chat/Chat.jsx';
import Apps from './Temp.jsx';
import "./app.css"
import Casefileopt from "./client_dashboard/CaseFileOpt.jsx"
import ClientCases from './client_dashboard/casedetails.jsx'
import IndividualCasesID from './client_dashboard/individulcases.jsx'
import Mycases from './Admin_dashboard_components/Mycases.jsx'
import AddUsers from './Admin_dashboard_components/publicadv_judgeregister.jsx'
import ErrorPage from './pages/ErrorPage.jsx';
import Causelist from './client_dashboard/Cause_list.jsx'
import Judgeassign from './Admin_dashboard_components/judge_assign.jsx'
import PubAdvassign from './Admin_dashboard_components/publicadvocateassign.jsx'
import Pubadvcases from './advocate/mycases.jsx'
import Advcasetracking from './advocate/CaseTracking.jsx'
import Services from './pages/service';
import Contact from './pages/contact';
import ClientEventForm from './client_dashboard/ClientEventForm.jsx';
import AdminEventForm from './Admin_dashboard_components/AdminEventForm.jsx';
import JudgeEventForm from './judge/JudgeEventForm.jsx';
import JudgeMycasesPage from './judge/JudgeMyCases.jsx';
import JudgeCaseDetails from './judge/JudgeIndividualCases.jsx';
import JudgeCaseTracking from './judge/CaseTracking.jsx';
import PublicAdvocateForm from './client_dashboard/publicAdvocate.jsx';
import Judgecauselist from './judge/Cause_list.jsx'
import { ThemeProvider } from 'react-bootstrap';
import theme from './theme.jsx';
import Courtcases from './Admin_dashboard_components/courtcases.jsx'
const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <AuthProvider>
      <Routes>
      <Route path='' element={<Layout/>}>
            <Route index element={<Home />}/>
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
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
          <Route path='/publicadvocatecasefiling' element={<PublicAdvocateForm/>}/>
          <Route path='/fileacase' element={<FileACaseMin/>}/>
          <Route path='/client/pre-trial' element={<VideoConference/>}/>
          <Route path='judge/schedule-pre-trial' element={<JudgeConference/>}/>
          <Route path="/homecon/:meetingID" element={<HomeCon/>}/>
          <Route path='/room/:roomID' element={<Room/>}/>
          <Route path='client/case-tracking' element={<CaseTracking/>}/>
          <Route path="/judge/register/complete/:token" element={<JudgeReg />} />
          <Route path='/judge/scheduling-event' element={<JudgeEventForm/>}/>
          <Route path='/judge/my-cases' element={<JudgeMycasesPage/>}/>
          <Route path="/judge/my-cases/:caseId" element={<JudgeCaseDetails />} />
          <Route path="/client/fileacase" element={<Casefileopt />} />
          <Route path="/client/mycases" element={<ClientCases/>} />
          <Route path="/client/mycases/:caseId" element={<IndividualCasesID />} />
          <Route path="/client/scheduling-event" element={<ClientEventForm/>}/>
            <Route path="/cao/mycases" element={<Mycases />} />
          <Route path="/cao/court-cases" element={<Courtcases />} />
            
          <Route path="/cao/addjudge-publicadv" element={<AddUsers/>} />
          <Route  path="*" element={<ErrorPage/>}/>
          <Route path="/client/cause-list" element={<Causelist />} />
            <Route path="/cao/judge-assign" element={<Judgeassign />} />
            <Route path="/cao/publicadvocate-assign" element={<PubAdvassign />} />

            <Route path='judge/case-tracking' element={<JudgeCaseTracking />} />
          <Route path='judge/cause-list' element={<Judgecauselist/>}/>
            <Route path='advocate/cause-list' element={<Advcauselist />} />
            <Route path='advocate/my-cases' element={<Pubadvcases />} />
          <Route path='advocate/case-tracking' element={<Advcasetracking/>}/>
            
            
            
            
          <Route path='/cao/scheduling-event' element={<AdminEventForm/>}/>
        </Route>
      </Routes>
      </AuthProvider>
    </Router>
    </ThemeProvider>
  );
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


