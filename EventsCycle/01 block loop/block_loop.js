const fs = require('fs');
let http = require('http');

function readFile() {
  // BAD
  // fs.readFileSync('./files/file.txt', 'utf8');

  // GOOD
  fs.createReadStream('./files/file.txt', {
    encoding: 'utf-8',
  });
}

http
  .createServer(function (req, res) {
    for (let index = 0; index < 500; index++) {
      readFile();
    }
    res.write('hello world');
    res.end();
  })
  .listen(8080);
