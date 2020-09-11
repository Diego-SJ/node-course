const fs = require('fs');
const { Duplex } = require('stream');

const streamRead = fs.createReadStream('./files/base.txt');
const streamWrite = fs.createWriteStream('./files/destiny.txt');

const report = new Duplex({
  write(data, encode, callback) {
    console.log(data);
    callback();
  },
  read(size) {},
});

streamRead.pipe(report).pipe(streamWrite);
