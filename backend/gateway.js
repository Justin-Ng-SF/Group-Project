const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const port = process.env.PORT || 4001;

const apiProxy = httpProxy.createProxyServer();

apiProxy.on('error', (err, req, res) => {
  console.log(err)
  res.status(500).send('Proxy Error');
});

app.all("/api/auth/*", (req, res) => {
  console.log(req.path)
  apiProxy.web(req, res, {
    target: 'http://localhost:4000',
  });
});

app.all("/api/allitems", (req, res) => {
  console.log(req.path)
  apiProxy.web(req, res, {
    target: 'http://localhost:4000',
  });
});

app.all("/api/transaction/*", (req, res) => {
  console.log(req.path)
  apiProxy.web(req, res, {
    target: 'http://localhost:4002',
  });
});

app.all("/api/inventory/*", (req, res) => {
  console.log(req.path)
  apiProxy.web(req, res, {
    target: 'http://localhost:4003',
  });
});

app.listen(port, () => console.log(`Gateway on port ${port}!`))
