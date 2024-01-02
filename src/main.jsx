import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import ClientDashboard from './client/Clientdashboard';
import AdvocateDashboard from './advocate/AdvocateDashboard';
import JudgeDashboard from './judge/Judgedashboard';
import COADashboard from './coa/COAdashboard';
import Services from './pages/service';
import Contact from './pages/contact';
import ClientForm from './REGISTER/Client-register';
import AdvocateForm from './REGISTER/Advocate-register';
import SetPassword from './components/Setpassword';
import Advpassword from "./components/privateAdvpassword";
import PaymentComponent from './dashborad-components/payment.jsx'
import AdvocateList from './dashborad-components/AdvoacateList.jsx'
import FileUploader from './dashborad-components/Sendingfiles.jsx'
import CaseFilingForm from './dashborad-components/FileACase.jsx';
import FileACaseMin from './dashborad-components/FileACaseMin.jsx';
import "./index.css"
import Layout from './components/Layout.jsx';
import SenderComponent from './dashborad-components/Notification/Sender.jsx';
import ReceiverComponent from './dashborad-components/Notification/Reciever.jsx';
import Profile from './dashborad-components/Profile.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='' element={<Layout/>}/>
          <Route index element={<Home />}/>
          <Route path="/Login" element={<LoginPage />} />
          {/*
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} /> */}
          <Route path="/client/register" element={<ClientForm />} />
          <Route path="/advocate/register" element={<AdvocateForm />} />
          <Route path="/set-password/:token" element={<SetPassword />} />
          <Route path="/Advocate/set-password/:token" element={<Advpassword/>} />
        <Route path="">
          <Route path="/clientdashboard" element={<ClientDashboard />} />
          <Route path="/advocatedashboard" element={<AdvocateDashboard />} />
          <Route path="/judgedashboard" element={<JudgeDashboard />} />
          <Route path="/admindashboard" element={<COADashboard />} />
          <Route path='/payment' element={<PaymentComponent/>}/>
          <Route path='/advocatelist' element={<AdvocateList/>}/>
          <Route path='/sendingfiles' element={<FileUploader/>}/>
          <Route path='/sendingfiles' element={<FileUploader/>}/>
          <Route path='/fileacase' element={<CaseFilingForm/>}/>
          <Route path='/fileacasemain' element={<FileACaseMin/>}/>
          <Route path='/profile' element={<Profile/>}/>
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
