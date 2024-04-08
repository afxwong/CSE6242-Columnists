const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const cartoonsDirectory = path.join(__dirname, 'cartoons');

// Allow requests from your HTML origin (e.g., http://localhost:3000)
const allowedOrigins = [
    'http://127.0.0.1:5500', // Update this with your actual origin
    'http://localhost:3000',
    'http://localhost:5500'
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
    const arg = req.query.arg || "";
    const pythonProcess = spawn('python', ['script.py', arg]);
    let result = ''
    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python script output: ${data}`);
        // Send data back to client
        result += data.toString()
        // res.send(result.toString());
    });
    pythonProcess.stdout.on('end', () => {
        try {
          // If JSON handle the data
        //   console.log(JSON.parse(result));
        // res.send(data.toString());
        res.send(result.toString())
        
        } catch (e) {
          // Otherwise treat as a log entry
          console.log(result);
        }
    });
});

app.get('/numCartoons', (req, res) => {
    fs.readdir(cartoonsDirectory, (err, files) => {
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        res.send(imageFiles.length.toString())
    })
})

app.get('/cartoons', (req, res) => {
    const idx = parseInt(req.query.idx) || 0;

    fs.readdir(cartoonsDirectory, (err, files) => {
        if (err) {
            res.status(500).send('Error reading photos directory');
            return;
        }
        // Filter out non-image files and send the list of image filenames
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        const imagePath = path.join(cartoonsDirectory, imageFiles[idx])
        res.sendFile(imagePath);
    });
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});