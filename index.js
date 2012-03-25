var util = require('util'),
    exec = require('child_process').exec,
    fs = require('fs'),
    path = require('path'),
    port = process.env.PORT || 5315,
    http = require('http'),
    child;
    
var wkhtmltopdf_path = process.env.PORT ? './bin/wkhtmltopdf-linux-amd64' : 'wkhtmltopdf';
    
http.createServer(function (req, res) {
  
  if (req.url == '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('try something like <a href="/news.google.ch/nwshp">/news.google.ch/nwshp</a> ...\n');
    return;
  };
  
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
    return;
  }
  
  var pdf_url = req.url.substr(1),
      pdf_path = './' +pdf_url.replace(/\//g, '_') + '.pdf';
  
  path.exists(pdf_path, function(exists) {

    if (exists) {
      fs.readFile(pdf_path, function(error, content) {
        if (error) {
          res.writeHead(500);
          res.end();
        }
        else {
          res.writeHead(200, { 'Content-Type': 'application/pdf' });
          res.end(content, 'utf-8');
        }
      });
    }
    else {
      console.log('generating ' + pdf_path + ' out of ' + pdf_url)
      
      child = exec([wkhtmltopdf_path, '--print-media-type', '--no-background', 'https://' + pdf_url, pdf_path].join(' '),
        function (error, stdout, stderr) {
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
          if (error !== null) {
            console.log('exec error: ' + error);
          }
      });

      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('generating pdf ...\n');
    }
  });
}).listen(port);
console.log('Server running at ' + port);