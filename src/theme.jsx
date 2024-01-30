import {  createTheme } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3', // Change this to your desired primary color
    },
    secondary: {
      main: '#FF4081', // Change this to your desired secondary color
    },
    error: {
        main: '#f44a57', // Change this to your desired secondary color
    },
    table: {
        main: '#f44a57', // Change this to your desired primary color
      },
    // Add more custom colors as needed
  },
});

export default theme;