// OrderJudgements.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} className="form-paper">
            <Typography variant="h6">Orders </Typography>
            {showOrderForm ? (
                <div>
            <TextField
              label="Case Number"
              variant="outlined"
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
            />
            <Button variant="contained" onClick={() => fetchCaseDetails(caseNumber)}>
              Fetch Details
            </Button>
            {validCaseNumber && (
              <div>
                <Typography variant="subtitle1">Plaintiff: {plaintiffName}</Typography>
                <Typography variant="subtitle1">Plaintiff Email: {plaintiffEmail}</Typography>
                <Typography variant="subtitle1">Defendant: {defendantName}</Typography>
                <Typography variant="subtitle1">Defendant Email: {defendantEmail}</Typography>
                <Typography variant="subtitle1">Advocate: {advocateName}</Typography>
              </div>
            )}

<Typography variant="h6">Create Order</Typography>
            <TextField
              select
              label="Order Type"
              variant="outlined"
              fullWidth
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
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
              rows={4}
              value={orderContent}
              onChange={(e) => setOrderContent(e.target.value)}
            />
              <LocalizationProvider dateAdapter={ AdapterDayjs}>
              <MobileDatePicker
                label="Order Date"
                value={orderDate}
                onChange={(date) => setOrderDate(date)}
                renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
              />
            </LocalizationProvider>
            <Button variant="contained" color="primary" onClick={handleSubmitOrder}>
              Submit Order
            </Button>
            </div>
            ) : (
                <div>
                  <Typography variant="h6">Order List</Typography>
                  <ul>
                    {ordersList.map((order) => (
                      <li key={order.orderId}>
                      <strong>Order ID:</strong> {order.orderId}<br />
                      <strong>Order Type:</strong> {order.orderType}<br />
                      <strong>Order Content:</strong> {order.orderContent}<br />
                      <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}<br />
                      <strong>Judge:</strong> {order.judge}<br />
                      {/* Add other details as needed */}
                    </li>
                    ))}
                  </ul>
                </div>
              )}
              <Button variant="contained" color="primary" onClick={handleToggleForm} style={{ marginTop: '10px' }}>
                {showOrderForm ? 'Show Order List' : 'Make Orders'}
              </Button>
            
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Orders;

