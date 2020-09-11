const fs = require('fs');

const streamRead = fs.createReadStream('./files/base.txt');
const streamWrite = fs.createWriteStream('./files/destiny.txt');

streamRead.pipe(streamWrite);

streamRead.on('end', () => {
  console.log('Finished process');
});
