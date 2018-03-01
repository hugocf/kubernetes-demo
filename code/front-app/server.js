// front-app

const http = require('http');

const url = 'http://back-app:8000';

const handleRequest = function(request, response) {
  http.get(url, (res) => {
    let body = '';

    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      console.log('Received request for URL: ' + request.url + ' returned body: ' + body);
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify({ server: body }));
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

http.createServer(handleRequest).listen(8000);
