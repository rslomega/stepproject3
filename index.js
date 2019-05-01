let http = require('http');
let fs = require('fs');
let src = http.createServer(function (req, res) {
  console.log('Responding to a request.');
  fs.readFile('src/index.html', function (err, data) {
    res.end(data);
  });
});
src.listen(3000);