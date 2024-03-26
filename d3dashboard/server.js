const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const port = 3000;

// Allow requests from your HTML origin (e.g., http://localhost:3000)
const allowedOrigins = [
    'http://127.0.0.1:5500', // Update this with your actual origin
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

app.get('/data', (req, res) => {
    // Execute Python script
    const pythonProcess = spawn('python', ['script.py']);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python script output: ${data}`);
        // Send data back to client
        res.send(data.toString());
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});