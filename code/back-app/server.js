// back-app

const http = require('http');
const os = require('os')

const handleRequest = function(request, response) {
  response.end(os.hostname());
};

http.createServer(handleRequest).listen(8000);
