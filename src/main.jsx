import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
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
import Advpassword from "./components/privateAdvpassword.jsx";
import PaymentComponent from './dashborad-components/payment.jsx'
import AdvocateList from './dashborad-components/AdvoacateList.jsx'
import FileUploader from './dashborad-components/Sendingfiles.jsx'
import PubAdvReg from "./components/publicadvreg.jsx";
import JudgeReg from "./components/Judgereg.jsx"
import Casefileopt from "./client_dashboard/CaseFileOpt.jsx"
import ClientCases from './client_dashboard/casedetails.jsx'
import IndividualCasesID from './client_dashboard/individulcases.jsx'
import Mycases from './Admin_dashboard_components/Mycases.jsx'
import AddUsers from './Admin_dashboard_components/publicadv_judgeregister.jsx'
import Causelist from './client_dashboard/Cause_list.jsx'
import Judgeassign from './Admin_dashboard_components/judge_assign.jsx'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/client/register" element={<ClientForm />} />
          <Route path="/advocate/register" element={<AdvocateForm />} />
          <Route path="/client/set-password/:token" element={<SetPassword />} />
          <Route path="/advocate/set-password/:token" element={<Advpassword/>} />
        </Route>
        <Route path="">
          <Route path="/clientdashboard" element={<ClientDashboard />} />
          <Route path="/advocatedashboard" element={<AdvocateDashboard />} />
          <Route path="/judgedashboard" element={<JudgeDashboard />} />
          <Route path="/admindashboard" element={<COADashboard />} />
          <Route path='/payment' element={<PaymentComponent/>}/>
          <Route path='/advocatelist' element={<AdvocateList/>}/>
          <Route path='/sendingfiles' element={<FileUploader/>}/>
          <Route path='/sendingfiles' element={<FileUploader />} />
          <Route path="/advocate/register/complete/:token" element={<PubAdvReg />} />
          <Route path="/judge/register/complete/:token" element={<JudgeReg />} />
          <Route path="/client/fileacase" element={<Casefileopt />} />
          <Route path="/client/mycases" element={<ClientCases/>} />
          <Route path="/client/mycases/:caseId" element={<IndividualCasesID />} />
          <Route path="/cao/mycases" element={<Mycases />} />
          <Route path="/cao/addjudge-publicadv" element={<AddUsers />} />
          <Route path="/client/cause-list" element={<Causelist />} />
          <Route path="/cao/judge-assign" element={<Judgeassign/>} />
          
          
          
          
          
          
          
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
