const express = require('express');

// Constants
const PORT = 3002;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
    console.log("service b called for some reason")
  res.send('Hello From Service B');
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
