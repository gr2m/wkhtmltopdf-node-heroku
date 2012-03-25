var util = require('util'),
    exec = require('child_process').exec,
    child;

var port = process.env.PORT || 5315,
    http = require('http');
http.createServer(function (req, res) {
  
  child = exec('./bin/wkhtmltopdf-linux-amd64 --help',
    function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
  });
  
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(port);
console.log('Server running at ' + port);