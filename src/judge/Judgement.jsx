import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrintIcon from '@mui/icons-material/Print';
import CloseIcon from '@mui/icons-material/Close';

const Judgement = () => {
  const [caseNumber, setCaseNumber] = useState('');
  const [courtName, setCourtName] = useState('');
  const [judgeName, setJudgeName] = useState('');
  const [dateOfJudgment, setDateOfJudgment] = useState('');
  const [plaintiffName, setPlaintiffName] = useState('');
  const [defendantName, setDefendantName] = useState('');
  const [advocateName, setAdvocateName] = useState('');
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
  const [viewDetailsDialogOpen, setViewDetailsDialogOpen] = useState(false);
  const [selectedJudgement, setSelectedJudgement] = useState(null);


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
        const response = await axios.get('http://localhost:5000/judge/get-judgements', {
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

  const styles = {
    fullPage: {
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  };

  const handleViewDetails = (judgment) => {
    setSelectedJudgement(judgment);
    setViewDetailsDialogOpen(true);
  };

  const handleCloseViewDetailsDialog = () => {
    setSelectedJudgement(null);
    setViewDetailsDialogOpen(false);
  };

  const handlePrintDetails = () => {
    const printWindow = window.open('', '_blank');
  
    if (printWindow) {
      printWindow.document.write('<html><head><title>Judgement Details</title></head><body>');
      printWindow.document.write('<style>');
      // Add your custom styles here
      printWindow.document.write(`
        body {
          font-family: 'Arial', sans-serif;
          margin: 20px;
        }
        h1 {
          color: darkblue;
          text-align: center;
        }
        .details-label {
          font-weight: bold;
        }
        .details-section {
          margin-top: 20px;
        }
      `);
      printWindow.document.write('</style>');
      printWindow.document.write('<h1>Judgement Details</h1>');
  
      // Add the details you want to print
      if (selectedJudgement) {
        printWindow.document.write('<div class="details-section">');
        printWindow.document.write('<p class="details-label">Case Number:</p>');
        printWindow.document.write(`<p>${selectedJudgement.caseNumber}</p>`);
        printWindow.document.write('</div>');
  
        printWindow.document.write('<div class="details-section">');
        printWindow.document.write('<p class="details-label">Court Name:</p>');
        printWindow.document.write(`<p>${selectedJudgement.courtName}</p>`);
        printWindow.document.write('</div>');
  
        printWindow.document.write('<div class="details-section">');
        printWindow.document.write('<p class="details-label">Judge Name:</p>');
        printWindow.document.write(`<p>${selectedJudgement.judgeName}</p>`);
        printWindow.document.write('</div>');
  
        printWindow.document.write('<div class="details-section">');
        printWindow.document.write('<p class="details-label">Date of Judgment:</p>');
        printWindow.document.write(`<p>${new Date(selectedJudgement.dateOfJudgment).toLocaleDateString()}</p>`);
        printWindow.document.write('</div>');
  
        printWindow.document.write('<div class="details-section">');
        printWindow.document.write('<p class="details-label">Plaintiff Name:</p>');
        printWindow.document.write(`<p>${selectedJudgement.plaintiffName}</p>`);
        printWindow.document.write('</div>');
  
        printWindow.document.write('<div class="details-section">');
        printWindow.document.write('<p class="details-label">Defendant Name:</p>');
        printWindow.document.write(`<p>${selectedJudgement.defendantName}</p>`);
        printWindow.document.write('</div>');
  
        printWindow.document.write('<div class="details-section">');
        printWindow.document.write('<p class="details-label">Advocate Name:</p>');
        printWindow.document.write(`<p>${selectedJudgement.advocateName}</p>`);
        printWindow.document.write('</div>');
  
        printWindow.document.write('<div class="details-section">');
        printWindow.document.write('<p class="details-label">Factual Background:</p>');
        printWindow.document.write(`<p>${selectedJudgement.factualBackground}</p>`);
        printWindow.document.write('</div>');
  
        printWindow.document.write('<div class="details-section">');
        printWindow.document.write('<p class="details-label">Legal Issues:</p>');
        printWindow.document.write(`<p>${selectedJudgement.legalIssues}</p>`);
        printWindow.document.write('</div>');
  
        printWindow.document.write('<div class="details-section">');
        printWindow.document.write('<p class="details-label">Plaintiff\'s Arguments:</p>');
        printWindow.document.write(`<p>${selectedJudgement.plaintiffArg}</p>`);
        printWindow.document.write('</div>');
  
        printWindow.document.write('<div class="details-section">');
        printWindow.document.write('<p class="details-label">Defendant\'s Arguments:</p>');
        printWindow.document.write(`<p>${selectedJudgement.defendantArg}</p>`);
        printWindow.document.write('</div>');
  
        printWindow.document.write('<div class="details-section">');
        printWindow.document.write('<p class="details-label">Analysis and Decision:</p>');
        printWindow.document.write(`<p>${selectedJudgement.analysisAndDecision}</p>`);
        printWindow.document.write('</div>');
  
        printWindow.document.write('<div class="details-section">');
        printWindow.document.write('<p class="details-label">Orders and Relief:</p>');
        printWindow.document.write(`<p>${selectedJudgement.ordersAndRelief}</p>`);
        printWindow.document.write('</div>');
  
        printWindow.document.write('<div class="details-section">');
        printWindow.document.write('<p class="details-label">Disposition:</p>');
        printWindow.document.write(`<p>${selectedJudgement.disposition}</p>`);
        printWindow.document.write('</div>');
  
        printWindow.document.write('<div class="details-section">');
        printWindow.document.write('<p class="details-label">Conclusion:</p>');
        printWindow.document.write(`<p>${selectedJudgement.conclusion}</p>`);
        printWindow.document.write('</div>');
  
        printWindow.document.write('<div class="details-section">');
        printWindow.document.write('<p class="details-label">Signature:</p>');
        printWindow.document.write(`<p>${selectedJudgement.signature}</p>`);
        printWindow.document.write('</div>');
      }
  
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error('Failed to open print window');
    }
  };
  

  return (
    <Container component="main" maxWidth="false" style={styles.fullPage}>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
       
       <div style={{ position: 'fixed', top: '30px', right: '30px' , zIndex: 1000  }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowJudgementForm(!showJudgementForm)}
      >
        {showJudgementForm ? 'Show Fetched Judgments' : 'Make Judgements'}
      </Button>
    </div>
 
     <br></br>
      {showJudgementForm ? (
        
        <Paper elevation={3} style={{ padding: '10px' }}>
          <Typography variant="h4" style={{ marginLeft: '600px' }}>JUDGEMENT FORM</Typography>
          <br></br>
          <br></br>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Court Name"
                variant="outlined"
                fullWidth
                disabled
                value={courtName}
                onChange={(e) => handleChange(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Judge Name"
                variant="outlined"
                fullWidth
                value={judgeName}
                onChange={(e) => setJudgeName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date of Judgment"
                type="date"
                variant="outlined"
                fullWidth
                value={dateOfJudgment}
                onChange={(e) => setDateOfJudgment( e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6} >
              <TextField
                label="Signature"
                variant="outlined"
                fullWidth
                value={signature}
                onChange={(e) => setSignature( e.target.value)}
              />
            </Grid>
          </Grid>
          <br></br>
          <Button variant="contained" color="primary" onClick={handleSubmitJudgement} style={{ marginTop: '16px',marginLeft:'600px', width:'200px' }}>
            Submit
          </Button>
        </Paper>
      ) : (
        <>
          <Typography variant="h4">JUGEMENTS LIST</Typography>
          {judgementsList.length === 0 ? (
            <Typography variant="body1" style={{ marginTop: '20px' }}>No judgments available</Typography>
          ) : (
          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ background: 'darkblue', color: 'white' }}>S.NO.</TableCell>
                  <TableCell style={{ background: 'darkblue', color: 'white' }}>CASE NUMBER</TableCell>
                  <TableCell style={{ background: 'darkblue', color: 'white' }}>COURT NAME</TableCell>
                  <TableCell style={{ background: 'darkblue', color: 'white' }}>JUDGE NAME</TableCell>
                  <TableCell style={{ background: 'darkblue', color: 'white' }}>DATE OF JUDGEMENT</TableCell>
                  <TableCell style={{ background: 'darkblue', color: 'white' }}>PLAINTIFF NAME</TableCell>
                  <TableCell style={{ background: 'darkblue', color: 'white' }}>DEFENDANT NAME</TableCell>
                  <TableCell style={{ background: 'darkblue', color: 'white' }}>ADVOCATE NAME</TableCell>
                  <TableCell style={{ background: 'darkblue', color: 'white' }}>ACTIONS</TableCell>
                  {/* Add more headers based on your judgment data structure */}
                </TableRow>
              </TableHead>
              <TableBody>
                {judgementsList.map((judgment, index) => (
                  <TableRow key={judgment.judgementId}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell><strong>{judgment.caseNumber}</strong></TableCell>
                    <TableCell>{judgment.courtName}</TableCell>
                    <TableCell>{judgment.judgeName}</TableCell>
                    <TableCell>{new Date(judgment.dateOfJudgment).toLocaleDateString()}</TableCell>
                    <TableCell>{judgment.plaintiffName}</TableCell>
                    <TableCell>{judgment.defendantName}</TableCell>
                    <TableCell>{judgment.advocateName}</TableCell>
                    <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleViewDetails(judgment)}
                    >
                      View Judgements
                    </Button>
                  </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          )}
        </>
      )}

      

       {/* View Details Dialog */}
       <Dialog open={viewDetailsDialogOpen} onClose={handleCloseViewDetailsDialog} maxWidth="md" fullWidth>
        <DialogTitle>Judgement Details</DialogTitle>
        <DialogContent>
          {selectedJudgement && (
            <>
            {judgementsList.map((judgment) => (
          <div key={judgment.judgementId}>
            <Typography>{`Case Number: ${judgment.caseNumber}`}</Typography>
            <Typography>{`Court Name: ${judgment.courtName}`}</Typography>
            <Typography>{`Judge Name: ${judgment.judgeName}`}</Typography>
            <Typography>{`Date of Judgment: ${judgment.dateOfJudgment}`}</Typography>
            <Typography>{`Plaintiff Name: ${judgment.plaintiffName}`}</Typography>
            <Typography>{`Defendant Name: ${judgment.defendantName}`}</Typography>
            <Typography>{`Advocate Name: ${judgment.advocateName}`}</Typography>
            <Typography>{`Factual Background: ${judgment.factualBackground}`}</Typography>
            <Typography>{`Legal Issues: ${judgment.legalIssues}`}</Typography>
            <Typography>{`Plaintiff's Arguments: ${judgment.plaintiffArguments}`}</Typography>
            <Typography>{`Defendant's Arguments: ${judgment.defendantArguments}`}</Typography>
            <Typography>{`Analysis and Decision: ${judgment.analysisAndDecision}`}</Typography>
            <Typography>{`Orders and Relief: ${judgment.ordersAndRelief}`}</Typography>
            <Typography>{`Disposition: ${judgment.disposition}`}</Typography>
            <Typography>{`Conclusion: ${judgment.conclusion}`}</Typography>
            <Typography>{`Signature: ${judgment.signature}`}</Typography>
            <hr style={{ margin: '8px 0' }} />
          </div>
        ))}
              {/* Display judgment details here */}
              {/* ... (you can use Typography or other components) */}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePrintDetails} startIcon={<PrintIcon />}>
            Print
          </Button>
          <Button onClick={handleCloseViewDetailsDialog} startIcon={<CloseIcon />} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Judgement;
