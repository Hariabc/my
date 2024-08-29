import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Button, Typography, Grid, Container } from '@mui/material';
import './MyCases.css';

const MyCases = () => {
  const [cases, setCases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.get('http://localhost:5000/client/mycases', { withCredentials: true });
        console.log('Cases:', response.data);
        setCases(response.data.cases || []);
      } catch (error) {
        console.error('Error fetching cases:', error);
      }
    };

    fetchCases();
  }, []);

  const viewCaseDetails = (caseId) => {
    navigate(`/client/mycases/${caseId}`);
  };

  return (
    <>
    <Container className='cases-container'  style={{border:"3px solid #332941",marginTop:"10px"}}>
    <Grid container spacing={2} className="cases-container" style={{ maxWidth: '100%', margin: 'auto' }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom align='center' >
          MY CASES
        </Typography>
      </Grid>
      {cases.length > 0 ? (
        cases.map((caseItem) => (
          <Grid item key={caseItem._id}  md={4} >
            <Card style={{borderTop:"3px solid #864AF9"}}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  Case ID: {caseItem.caseNumber}
                </Typography>
                {/* Display other case details */}
                <Button variant="contained" onClick={() => viewCaseDetails(caseItem._id)}>
                  View Case Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="body1">No cases found</Typography>
        </Grid>
      )}
    </Grid>
    </Container>
    </>
  );
};

export default MyCases;
