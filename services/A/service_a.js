
const express = require('express');
const axios = require('axios')
var fs = require('fs');
const pino = require('pino')
const ecsFormat = require('@elastic/ecs-pino-format') // @elastic/ecs-pino-format

const log = pino({ ...ecsFormat({ convertReqRes: true }) })

// Constants
const PORT = 3001;
const HOST = '0.0.0.0';


const apm = require('elastic-apm-node').start({
  // Override service name from package.json
  // Allowed characters: a-z, A-Z, 0-9, -, _, and space
  // logger: log,

  serviceName: 'service-a',

  // Use if APM Server requires a token
  secretToken: '',

  // Use if APM Server uses API keys for authentication
  apiKey: '',

  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: 'http://apm-server:8200',
  logLevel: 'trace'
})

count = 0
// App
const app = express();
app.get('/', (req, res) => {
  fs.writeFile('/tmp/' + count + '.txt', 'Hello content!', function (err) {
    count += 1
    traceIds = apm.currentTraceIds
    apm.captureError({"hopefully": "reached"}, {params: "nothing seems right"})
    apm.logger.error({"trace": "val"}, {msg: "hello lala" , "trace": traceIds})
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
