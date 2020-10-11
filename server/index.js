const express = require('express');
const path = require('path');

const port = process.env.port || 4260;
const app = express();

const destinationDir = path.join(__dirname,'../dist')

// hosting from dist folder
app.use(express.static(destinationDir))
console.log(`express hosing form ${destinationDir}`)

//serving index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(destinationDir, 'index.html'));
});
console.log(`serving index.html`);

//initialize app and listen to port
app.listen(port, () => console.log(`server is running from port ${port}`));