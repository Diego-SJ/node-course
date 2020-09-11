const fs = require('fs');
const { Transform } = require('stream');

const streamRead = fs.createReadStream('./files/base.txt');
const streamWrite = fs.createWriteStream('./files/destiny.txt');

streamRead.setEncoding('utf8');

const filter = new Transform({
  writableObjectMode: true,
  transform(data, encoding, callback) {
    this.push(data.toString().toUpperCase());
    callback();
  },
  final(callback) {
    callback();
  },
});

streamRead.pipe(filter).pipe(streamWrite);
