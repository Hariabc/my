import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Button, Typography, Grid } from '@mui/material';
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
    <Grid container spacing={2} className="cases-container" style={{ maxWidth: '100%', margin: 'auto' }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom >
          MY CASES
        </Typography>
      </Grid>
      {cases.length > 0 ? (
        cases.map((caseItem) => (
          <Grid item key={caseItem._id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  Case ID: {caseItem.caseNumber}
                </Typography>
                {/* Display other case details */}
                <Button variant="outlined" onClick={() => viewCaseDetails(caseItem._id)}>
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
  );
};

export default MyCases;
