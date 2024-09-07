const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const picturesDir = path.join(__dirname, 'pictures');

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Endpoint to get list of image files in the pictures directory
app.get('/images', (req, res) => {
  fs.readdir(picturesDir, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory');
    }
    const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    res.json(images);
  });
});

// Serve pictures
app.use('/pictures', express.static(picturesDir));

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
