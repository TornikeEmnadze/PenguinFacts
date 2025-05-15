const express = require('express');
const cors = require('cors'); 
const app = express();
const port = process.env.PORT || 3000; 

let latestData = "No data received yet.";

app.use(cors()); 
app.use(express.json()); 


app.post('/api/create-answer', (req, res) => {
  const receivedData = req.body.data;

  if (receivedData) {
    console.log('Received data:', receivedData);
    latestData = receivedData; 
    res.json({ message: 'Data received successfully!', data: latestData });
  } else {
    console.log('Received invalid data:', req.body);
    res.status(400).json({ message: 'Invalid request body. Expected { "data": "some-text" }' });
  }
});


app.get('/api/answer', (req, res) => {
    console.log('Frontend requested latest data:', latestData);
    res.json({ data: latestData });
});


app.get('/', (req, res) => {
  res.send('Backend is running!');
});


app.listen(port, '0.0.0.0', () => {
  console.log(`Backend server listening on http://0.0.0.0:${port}`);
  console.log(`POST endpoint: http://0.0.0.0:${port}/api/create-answer`);
  console.log(`GET endpoint: http://0.0.0.0:${port}/api/answer`);
});