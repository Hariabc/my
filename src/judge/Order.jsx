// OrderJudgements.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Container, CssBaseline,Dialog,
  DialogContent, Paper, TextField, Typography ,MenuItem,
  Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { MobileDatePicker } from '@mui/x-date-pickers'

const Orders = () => {


  
  const [caseNumber, setCaseNumber] = useState('');
  const [plaintiffName, setPlaintiffName] = useState('');
  const [defendantName, setDefendantName] = useState('');
  const [advocateName, setAdvocateName] = useState('');
  const [plaintiffEmail, setPlaintiffEmail] = useState('');
  const [defendantEmail, setDefendantEmail] = useState('');
  const [validCaseNumber, setValidCaseNumber] = useState(true);
  const [orderDate, setOrderDate] = useState(null);
  const [orderType, setOrderType] = useState('');
  const [orderContent, setOrderContent] = useState('');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [ordersList, setOrdersList] = useState([]);
  const [selectedOrderContent, setSelectedOrderContent] = useState('');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);


  const styles = {
    fullPage: {
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    header: {
      marginBottom: '20px',
    },
    formPaper: {
      padding: '20px',
      textAlign: 'center',
      width: '100%', // Adjust the width as needed
      overflowX: 'auto', 
    },
    makeOrdersButton: {
      position: 'fixed',
      top: '35px',
      right: '30px',
    },
    centeredButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    noOrdersMessage: {
      marginTop: '20px',
      fontSize: '1.2rem',
    },
    orderModal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    orderModalContent: {
      width: '60vw',
      maxHeight: '70vh',
      overflowY: 'auto',
      padding: '20px',
      textAlign: 'left',
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    spaceBetweenFields: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '20px', // Increase the gap as needed
      width: '100%',
    },
    textField: {
      marginBottom: '10px',
      width: '100%',
    },
    infoField: {
      marginTop: '10px',
      width: '100%',
    },
    sectionTitle: {
      marginTop: '20px',
    },
    selectField: {
      marginTop: '10px',
      marginBottom: '10px',
      width: '100%',
    },
    datePicker: {
      marginTop: '20px',
      width: '100%', // Adjust as needed
      
    },
    multilineField: {
      marginTop: '10px',
      marginBottom: '10px',
      width: '100%',
    },
    submitButton: {
      marginTop: '10px',
      width: '20%',
    },
  
    // ... (other styles)
  };

  useEffect(() => {
    if (caseNumber) {
      fetchCaseDetails(caseNumber);
    }
  }, [caseNumber]);

 


  function generateOrderId() {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let orderId = '';
  
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      orderId += characters.charAt(randomIndex);
    }
  
    return orderId;
  }
  
  // Example usage
  useEffect(() => {
    const fetchOrders = async () => {
        try {
          const response = await axios.get('http://localhost:5000/judge/get-orders' , {
            withCredentials: true,
          });
          setOrdersList(response.data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
    fetchOrders();
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
        const { fullName: plaintiffFullName, partyEmailAddresses: plaintiffEmail } = caseDetails.plaintiffDetails;
        const { fullName: defendantFullName, partyEmailAddresses: defendantEmail } = caseDetails.defendantDetails || { fullName: 'None', partyEmailAddresses: 'None' };
        const { fullName: advocateFullName } = caseDetails.advocateDetails || { fullName: 'None' };
        
        setPlaintiffName(plaintiffFullName);
        setPlaintiffEmail(plaintiffEmail);
        setDefendantName(defendantFullName);
        setDefendantEmail(defendantEmail);
        setAdvocateName(advocateFullName);
        setValidCaseNumber(true);
      } else {
        setPlaintiffName('');
        setPlaintiffEmail('');
        setDefendantName('');
        setDefendantEmail('');
        setAdvocateName('None');
        setValidCaseNumber(false);
      }
    } catch (error) {
      console.error('Error fetching case details:', error);
    }
  };

  const handleSubmitOrder = async () => {
    try {
        const generatedOrderId = generateOrderId();
      // Assuming you have an API endpoint to create orders
      const orderResponse = await axios.post('http://localhost:5000/judge/orders', {
        caseNumber,
        orderId : generatedOrderId,
        orderType,
        orderContent,
        orderDate,
      },{
        withCredentials: true, // Ensure credentials are sent
      });
      console.log('Order created:', orderResponse.data);
      showCustomToast(`Order Published successfully! Order ID: ${generatedOrderId}`, 'success');
      
    } catch (error) {
      console.error('Error creating order:', error);
      showCustomToast('Error creating order. Please try again.', 'error');
    }
  };

  const handleToggleForm = () => {
    setCaseNumber('');
setPlaintiffName('');
setDefendantName('');
setAdvocateName('');
setPlaintiffEmail('');
setDefendantEmail('');
setValidCaseNumber(true);
setOrderType('');
setOrderContent('');
setOrderDate(null);
    setShowOrderForm(!showOrderForm);
  };

  
  const handleViewOrder = (orderContent) => {
    setSelectedOrderContent(orderContent);
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
  };


  return (
    <Container component="main" maxWidth='false' style={styles.fullPage} >
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
      <CssBaseline />
          
          <Button
              variant="contained"
              color="primary"
              onClick={handleToggleForm}
              style={styles.makeOrdersButton}
            >
              {showOrderForm ? 'Show Order List' : 'Make Orders'}
            </Button>
            <br></br>
            <Typography variant="h3" style={styles.header}>
        ORDERS
      </Typography>
      <br></br>
      <Paper elevation={3} style={styles.formPaper}>
  {showOrderForm ? (
    <div style={styles.formContainer}>
      <br />
      <TextField
        label="Case Number"
        variant="outlined"
        value={caseNumber}
        onChange={(e) => setCaseNumber(e.target.value)}
        required
        style={styles.textField}
      />

      {validCaseNumber && (
        <div style={styles.spaceBetweenFields}>
          <TextField
            label="Plaintiff Name"
            variant="outlined"
            value={plaintiffName}
            disabled
            InputProps={{
              readOnly: true,
            }}
            style={styles.infoField}
          />
          <TextField
            label="Plaintiff Email"
            variant="outlined"
            disabled
            value={plaintiffEmail}
            InputProps={{
              readOnly: true,
            }}
            style={styles.infoField}
          />
          <TextField
            label="Defendant Name"
            variant="outlined"
            disabled
            value={defendantName}
            InputProps={{
              readOnly: true,
            }}
            style={styles.infoField}
          />
          <TextField
            label="Defendant Email"
            variant="outlined"
            value={defendantEmail}
            disabled
            InputProps={{
              readOnly: true,
            }}
            style={styles.infoField}
          />
          <TextField
            label="Advocate Name"
            variant="outlined"
            value={advocateName}
            disabled
            InputProps={{
              readOnly: true,
            }}
            style={styles.infoField}
          />
        </div>
      )}

      <Typography variant="h6" style={styles.sectionTitle}>
        Create Order
      </Typography>
      <TextField
        select
        label="Order Type"
        variant="outlined"
        fullWidth
        value={orderType}
        required
        onChange={(e) => setOrderType(e.target.value)}
        style={styles.selectField}
      >
        <MenuItem value="courtDecision">Court Decision</MenuItem>
        <MenuItem value="ruling">Ruling</MenuItem>
        <MenuItem value="judgment">Judgment</MenuItem>
        <MenuItem value="dismissal">Dismissal</MenuItem>
        <MenuItem value="settlement">Settlement</MenuItem>
      </TextField>
      <TextField
        label="Order Content"
        variant="outlined"
        fullWidth
        multiline
        required
        rows={4}
        value={orderContent}
        onChange={(e) => setOrderContent(e.target.value)}
        style={styles.multilineField}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
  <MobileDatePicker
    label="Order Date"
    value={orderDate}
    required
    onChange={(date) => setOrderDate(date)}
    renderInput={(params) => (
      <TextField
        {...params}
        variant="outlined"
        fullWidth
        style={styles.datePicker}  
      />
    )}
  />
</LocalizationProvider>
      <Button variant="contained" style={styles.submitButton} color="primary" onClick={handleSubmitOrder}>
        Submit Order
      </Button>
            </div>
            ) : (
                <div>
                    {ordersList.length > 0 ? (
                 
                <Table style={{ width: '100%', marginTop: '20px' }}>
                  <TableHead>
                    <TableRow>
                    <TableCell style={{ background: 'darkblue', color: 'white' }}>S.NO.</TableCell>
                      <TableCell style={{ background: 'darkblue', color: 'white' }}>CASE NUMBER</TableCell>
                      <TableCell style={{ background: 'darkblue', color: 'white' }}>ORDER ID</TableCell>
                      <TableCell style={{ background: 'darkblue', color: 'white' }}>ORDER TYPE</TableCell>
                      <TableCell style={{ background: 'darkblue', color: 'white' }}>ORDER DATE</TableCell>
                      <TableCell style={{ background: 'darkblue', color: 'white' }}>ORDER CONTENT</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ordersList.map((order,index) => (
                      <TableRow key={order.orderId}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell><strong>{order.caseNumber}</strong></TableCell>
                        <TableCell>{order.orderId}</TableCell>
                        <TableCell>{order.orderType}</TableCell>
                        <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                        <div style={styles.centeredButton}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleViewOrder(order)}
                      >
                        View Order
                      </Button>
                      </div>
                    </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                ) : (
              <Typography variant="body1" style={styles.noOrdersMessage}>
                No orders available.
              </Typography>
            )}
              </div>
            )}
          </Paper>
          <Dialog open={isOrderModalOpen} onClose={handleCloseOrderModal} maxWidth="md">
        <DialogContent style={styles.orderModalContent }>
          {selectedOrderContent && (
            <>
              <Typography variant="h6" align='center'>Order Content</Typography>
              <br></br>
              <Typography>{selectedOrderContent.orderContent}</Typography>
              <br></br>
              <Button variant="contained" color="primary" style={{marginLeft:'155px'}} onClick={handleCloseOrderModal}>
                Close
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Orders;

