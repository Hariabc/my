import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/client/register" element={<ClientForm />} />
          <Route path="/advocate/register" element={<AdvocateForm />} />
          <Route path="/set-password/:token" element={<SetPassword/>} />
        </Route>
        <Route path="">
          <Route path="/clientd" element={<ClientDashboard />} />
          <Route path="/advocated" element={<AdvocateDashboard />} />
          <Route path="/judged" element={<JudgeDashboard />} />
          <Route path="/admind" element={<COADashboard />} />
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
