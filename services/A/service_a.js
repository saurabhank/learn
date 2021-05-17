
const express = require('express');
const axios = require('axios')
var fs = require('fs');


// Constants
const PORT = 3001;
const HOST = '0.0.0.0';


const apm = require('elastic-apm-node').start({
  // Override service name from package.json
  // Allowed characters: a-z, A-Z, 0-9, -, _, and space
  serviceName: 'service-a',

  // Use if APM Server requires a token
  secretToken: '',

  // Use if APM Server uses API keys for authentication
  apiKey: '',

  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: 'http://apm:8200',
})

count = 0
// App
const app = express();
app.get('/', (req, res) => {
  fs.writeFile('/usr/share/' + count + '.txt', 'Hello content!', function (err) {
    count += 1
    if (err) throw err;
    console.log('Saved!');
    res.send('Hello From Service A');
  });
});

app.get('/b', async (req, res)=> {
  console.log("now ready to call service b");
  result = await axios({
    method: 'get',
    url: 'http://service-b:3002/'
  })
  console.log("result deom service b ", result.data)
  res.send(result.data)
  
})
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
