// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware
app.use(bodyParser.json());

// Route to save names
app.post('/save-names', (req, res) => {
    const { yourName, crushName } = req.body;
    const data = { yourName, crushName };

    // Save data to JSON file
    fs.readFile(DATA_FILE, 'utf8', (err, jsonString) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        let jsonData = [];
        if (jsonString) {
            jsonData = JSON.parse(jsonString);
        }

        jsonData.push(data);

        fs.writeFile(DATA_FILE, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            console.log('Data saved successfully');
            res.json({ message: 'Data saved successfully' });
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
