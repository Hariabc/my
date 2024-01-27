import React, { useState , useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Judgement = () => {
    const [caseNumber, setCaseNumber] = useState('');
  const [courtName, setCourtName] = useState('');
  const [judgeName, setJudgeName] = useState('');
  const [dateOfJudgment, setDateOfJudgment] = useState('');
  const [plaintiffName, setPlaintiffName] = useState('');
  const [defendantName, setDefendantName] = useState('');
  const [advocateName , setAdvocateName] = useState('');
  const [factualBackground, setFactualBackground] = useState('');
  const [legalIssues, setLegalIssues] = useState('');
  const [plaintiffArg, setPlaintiffArguments] = useState('');
  const [defendantArg, setDefendantArguments] = useState('');
  const [analysisAndDecision, setAnalysisAndDecision] = useState('');
  const [ordersAndRelief, setOrdersAndRelief] = useState('');
  const [disposition, setDisposition] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [signature, setSignature] = useState('');
  const [judgementsList, setJudgementsList] = useState([]);
  const [showJudgementForm, setShowJudgementForm] = useState(false);
  const [validCaseNumber, setValidCaseNumber] = useState(true);

  function generateJudgementId() {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let judgementId = '';
  
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      judgementId += characters.charAt(randomIndex);
    }
  
    return judgementId;
  }

  useEffect(() => {
    const fetchJudgements = async () => {
        try {
          const response = await axios.get('http://localhost:5000/judge/get-judgements' , {
            withCredentials: true,
          });
          setJudgementsList(response.data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
    fetchJudgements();
  }, []);

  const showCustomToast = (message, type = 'info') => {
    toast[type](message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const fetchCaseDetails = async (enteredCaseNumber) => {
    try {
      const response = await axios.get(`http://localhost:5000/judge/mycases`, {
        withCredentials: true,
      });

      const caseDetails = response.data.find((caseDetail) => caseDetail.caseNumber === enteredCaseNumber);

      if (caseDetails) {
        const { fullName: plaintiffFullName } = caseDetails.plaintiffDetails;
        const { fullName: defendantFullName} = caseDetails.defendantDetails || { fullName: 'None'};
        const { fullName: advocateFullName } = caseDetails.advocateDetails || { fullName: 'None' };
        const { courtName: courtFullName } = caseDetails.caseDetails || {courtName: 'None'};
        setPlaintiffName(plaintiffFullName);
        
        setDefendantName(defendantFullName);
       
        setAdvocateName(advocateFullName);
        setCourtName(courtFullName);
        setValidCaseNumber(true);
      } else {
        setPlaintiffName('');
       
        setDefendantName('');
       
        setAdvocateName('None');
        setCourtName(''); 
        setValidCaseNumber(false);
      }
    } catch (error) {
      console.error('Error fetching case details:', error);
    }
  };


  
  const handleSubmitJudgement = async() => {
    try {
        const generatedJudgementId = generateJudgementId();
        const response = await axios.post('http://localhost:5000/judge/submit-judgment', {
          caseNumber,
          judgementId : generatedJudgementId,
          courtName,
          judgeName,
          dateOfJudgment,
          plaintiffName, 
          defendantName,
          advocateName,
          factualBackground,
          legalIssues,
          plaintiffArg,
           defendantArg,
          analysisAndDecision,
          ordersAndRelief,
          disposition,
          conclusion,
          signature,
        }, {
          withCredentials: true,
        });
  
        // Assuming your server responds with the saved judgment data
        const savedJudgment = response.data;
  
        // Update the judgements list
        setJudgementsList((prevList) => [...prevList, savedJudgment]);
  
        // Show success toast
        showCustomToast('Judgment submitted successfully!', 'success');
  
        // Clear the form
        setCaseNumber('');
        setCourtName('');
        setJudgeName('');
        setDateOfJudgment('');
        setPlaintiffName('');
        setDefendantName('');
        setAdvocateName('');
        setFactualBackground('');
        setLegalIssues('');
        setPlaintiffArguments('');
        setDefendantArguments('');
        setAnalysisAndDecision('');
        setOrdersAndRelief('');
        setDisposition('');
        setConclusion('');
        setSignature('');
        showCustomToast(`Judgement uploaded successfully! JudgementID: ${generatedJudgementId}`, 'success');
      } catch (error) {
        console.error('Error submitting judgment:', error);
        // Show error toast
        showCustomToast('Error submitting judgment. Please try again.', 'error');
      }
    };
    const handleCaseNumberChange = async (e) => {
        const enteredCaseNumber = e.target.value;
        setCaseNumber(enteredCaseNumber);
    
        // Fetch case details when the case number changes
        await fetchCaseDetails(enteredCaseNumber);
      };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h6">Judgment Form</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Case Number"
              variant="outlined"
              fullWidth
              value={caseNumber}
              onChange={handleCaseNumberChange}
              required
              error={!validCaseNumber}
              helperText={!validCaseNumber ? 'Invalid Case Number' : ''}

             
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Court Name"
              variant="outlined"
              fullWidth
              disabled
              value={courtName}
              onChange={(e) => handleChange(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Judge Name"
              variant="outlined"
              fullWidth
              value={judgeName}
              onChange={(e) => setJudgeName( e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Date of Judgment"
              type="date"
              variant="outlined"
              fullWidth
              value={dateOfJudgment}
              onChange={(e) => setDateOfJudgment( e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="PlaintiffName"
              variant="outlined"
              fullWidth
              disabled
              value={plaintiffName}
              onChange={(e) =>
                setPlaintiffName(e.target.value)}
               
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="DefendantName"
              variant="outlined"
              fullWidth
              disabled
              value={defendantName}
              onChange={(e) =>
                handleChange( e.target.value)}
               
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="AdvocateName"
              variant="outlined"
              fullWidth
              disabled
              value={advocateName}
              onChange={(e) =>
                setAdvocateName( e.target.value)}
               
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Factual Background"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={factualBackground}
              onChange={(e) =>
                setFactualBackground(e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Legal Issues"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={legalIssues}
              onChange={(e) => setLegalIssues( e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Plaintiff's Arguments"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={plaintiffArg}
              onChange={(e) =>
                setPlaintiffArguments( e.target.value)}
              
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Defendant's Arguments"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={defendantArg}
              onChange={(e) =>
            setDefendantArguments(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Analysis and Decision"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={analysisAndDecision}
              onChange={(e) =>
                setAnalysisAndDecision( e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Orders and Relief"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={ordersAndRelief}
              onChange={(e) =>
                setOrdersAndRelief( e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Disposition"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={disposition}
              onChange={(e) => setDisposition( e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Conclusion"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={conclusion}
              onChange={(e) => setConclusion( e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Signature"
              variant="outlined"
              fullWidth
              value={signature}
              onChange={(e) => setSignature( e.target.value)}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleSubmitJudgement}>
          Submit
        </Button>
      </Paper>
    </Container>
  );
};

export default Judgement;
