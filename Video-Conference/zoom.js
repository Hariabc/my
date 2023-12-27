// const express = require('express');
// const bodyParser = require('body-parser');
// const { ZoomMtg } = require('@zoomus/websdk');

// const app = express();
// const port = 3001; // Choose a suitable port

// app.use(bodyParser.json());

// // Set your Zoom API Key and Secret
// const apiKey = 'YOUR_ZOOM_API_KEY';
// const apiSecret = 'YOUR_ZOOM_API_SECRET';

// // Endpoint to generate a Zoom signature
// app.post('/generateSignature', (req, res) => {
//   const meetingNumber = req.body.meetingNumber;
//   const role = req.body.role;

//   const timestamp = new Date().getTime() - 30000; // 30 seconds in the past
//   const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64');
//   const hash = require('crypto').createHmac('sha256', apiSecret).update(msg).digest('base64');
//   const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64');

//   res.json({ signature });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
