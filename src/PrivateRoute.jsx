import ClientDashboard from "./client/Clientdashboard"


const PrivateRoutes = () => {
    const { isAuthenticated } = useAuth();
  
    // Redirect to the login page if not authenticated
    if (!isAuthenticated) {
      return <Navigate to="/Login" />;
    }
  
    return (
      <Routes>
        <Route path="/clientdashboard" element={<ClientDashboard />} />
        <Route path="/advocatedashboard" element={<AdvocateDashboard />} />
        <Route path="/judgedashboard" element={<JudgeDashboard />} />
        <Route path="/admindashboard" element={<COADashboard />} />
        <Route path='/payment' element={<PaymentComponent/>}/>
        <Route path='/advocatelist' element={<AdvocateList/>}/>
        <Route path='/sendingfiles' element={<FileUploader/>}/>
        <Route path='/sendingfiles' element={<FileUploader/>}/>
      </Routes>
    );
  };
  export default PrivateRoutes;