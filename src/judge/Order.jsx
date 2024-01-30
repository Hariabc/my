// OrderJudgements.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Container, CssBaseline, Grid, Paper, TextField, Typography ,MenuItem} from '@mui/material';
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

  useEffect(() => {
    if (caseNumber) {
      fetchCaseDetails(caseNumber);
    }
  }, [caseNumber]);

  const styles = {
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    textField: {
      marginBottom: '10px',
    },
    selectField: {
      marginTop: '10px',
      marginBottom: '10px',
      maxWidth : '20%',
    },
    multilineField: {
      marginTop: '10px',
      marginBottom: '10px',
    },
    submitButton: {
      marginTop: '10px',
    },
    infoField: {
      marginTop: '10px',
    },
    spaceBetweenButtons: {
      marginBottom: '10px', // Adjust as needed
    },
    
  };


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


  return (
    <Container component="main" maxWidth="xl" >
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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }} className="form-paper">
          
          
          <Button
              variant="contained"
              color="primary"
              onClick={handleToggleForm}
              style={styles.makeOrdersButton}
            >
              {showOrderForm ? 'Show Order List' : 'Make Orders'}
            </Button>
            
            {showOrderForm ? (
             <div style={styles.formContainer}>
              <br></br>
            <TextField
              label="Case Number"
              variant="outlined"
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
              required
              style={styles.textField}
            />
            
            {validCaseNumber && (
              <div style={styles.spaceBetweenButtons}>
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

<Typography variant="h6" style={{ marginTop: '20px' }}>Create Order</Typography>
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
              <LocalizationProvider dateAdapter={ AdapterDayjs}>
              <MobileDatePicker
                label="Order Date"
                value={orderDate}
                required
                onChange={(date) => setOrderDate(date)}
                renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
                style={styles.textField}
              />
            </LocalizationProvider>
            <Button variant="contained"  style={styles.submitButton} color="primary" onClick={handleSubmitOrder} >
              Submit Order
            </Button>
            </div>
            ) : (
                <div>
                 <Typography variant="h6" style={{ marginTop: '20px' }}>
                  Order List
                </Typography>
                <ul style={{ listStyle: 'none', padding: '0' }}>
                  {ordersList.map((order) => (
                    <li
                      key={order.orderId}
                      style={{
                        borderBottom: '1px solid #ccc',
                        padding: '10px 0',
                        marginBottom: '10px',
                      }}
                      >
                       <Typography variant="subtitle1">
      <strong>Case Number:</strong> {order.caseNumber}
    </Typography>
    
    <Typography variant="subtitle1">
      <strong>Order ID:</strong> {order.orderId}
    </Typography>
    <Typography variant="subtitle1">
      <strong>Order Type:</strong> {order.orderType}
    </Typography>
    <Typography variant="subtitle1">
      <strong>Order Content:</strong> {order.orderContent}
    </Typography>
    <Typography variant="subtitle1">
      <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
    </Typography>
    
                    </li>
                    ))}
                  </ul>
                </div>
              )}
              
            
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Orders;

