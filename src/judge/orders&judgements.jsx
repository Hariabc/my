// NavigationComponent.jsx
import React from 'react';
import { Button, Container, CssBaseline, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderJudgements = () => {
  const navigate = useNavigate();

  const handleOrdersClick = () => {
    // Navigate to the Orders component
    navigate('/orders');
  };

  const handleJudgementsClick = () => {
    // Navigate to the Judgements component
    navigate('/judgements');
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={12}>
          <Paper elevation={3} className="form-paper" style={{ textAlign: 'center', padding: '20px' }}>
            <Typography variant="h6">Welcome to E-Portal Case Management</Typography>
            <Typography variant="body1">Select an option below:</Typography>
            <Button variant="contained" color="primary" size="large" onClick={handleOrdersClick} style={{ margin: '20px' }}>
              View Orders
            </Button>
            <Button variant="contained" color="secondary" size="large" onClick={handleJudgementsClick} style={{ margin: '20px' }}>
              View Judgements
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderJudgements;
