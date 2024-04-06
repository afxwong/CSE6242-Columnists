const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const port = 3000;

// Allow requests from your HTML origin (e.g., http://localhost:3000)
const allowedOrigins = [
    'http://127.0.0.1:5500', // Update this with your actual origin
    'http://localhost:3000', 
    // Add more origins if needed
];

app.use(cors({
    origin: function(origin, callback) {
        // Check if the origin is allowed
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// New route for the root URL
app.get('/', (req, res) => {
    const currentUrl = `${req.protocol}://${req.get('host')}/`;
    const dataUrl = currentUrl + 'data'; // Construct the URL to the /data endpoint

    res.send(`Welcome to our Python-Node.js integration example! Go <a href="${dataUrl}">here</a> to execute the Python script.`);
});

app.get('/data', (req, res) => {
    // Execute Python script
    const arg = req.query.arg;
    const pythonProcess = spawn('python', ['script.py', arg]);
    let result = ''
    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python script output: ${data}`);
        // Send data back to client
        result += data.toString()
        // res.send(data.toString());
    });
    pythonProcess.stdout.on('end', () => {
        try {
          // If JSON handle the data
        //   console.log(JSON.parse(result));
        res.send(data.toString());
        
        } catch (e) {
          // Otherwise treat as a log entry
          console.log(result);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});