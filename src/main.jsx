import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ClientDashboard from './client/Clientdashboard';
import AdvocateDashboard from './advocate/AdvocateDashboard';
import JudgeDashboard from './judge/Judgedashboard';
import COADashboard from './coa/COAdashboard';
import Services from './pages/service';
import Contact from './pages/contact';
import ClientForm from './REGISTER/Client-register';
import AdvocateForm from './REGISTER/Advocate-register';
import SetPassword from './components/Setpassword';
import Advpassword from "./components/privateAdvpassword.jsx";
import PaymentComponent from './dashborad-components/payment.jsx'
import AdvocateList from './dashborad-components/AdvoacateList.jsx'
import FileUploader from './dashborad-components/Sendingfiles.jsx'
import CaseFilingForm from './dashborad-components/FileACase.jsx';
import FileACaseMin from './dashborad-components/FileACaseMin.jsx';
import "./index.css"
import Layout from './components/Layout.jsx';
import SenderComponent from './dashborad-components/Notification/Sender.jsx';
import ReceiverComponent from './dashborad-components/Notification/Reciever.jsx';
import AddUsers from './dashborad-components/AddUsers.jsx';
import Profile from './client/Profile.jsx';
import PubAdvReg from "./components/publicadvreg.jsx";
import JudgeReg from "./components/Judgereg.jsx"
import LoginPage from "./pages/login.jsx"
import ScrollAnimation from './components/ScrollAnimation.jsx';
// import MyChatComponent from './components/Framer.jsx';
const App = () => {
  return (
    <Router>
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
          <Route path='/framer' element={<ScrollAnimation/>}/> 
        </Route>
      </Routes>
    </Router>
  );
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
