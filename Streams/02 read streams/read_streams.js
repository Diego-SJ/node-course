const fs = require('fs');

const streamRead = fs.createReadStream('./files/my_file.txt', {
  encoding: 'utf8',
});

streamRead
  .on('open', () => {
    console.log('Opening file...');
  })
  .on('data', () => {
    console.log('....');
  })
  .on('close', () => {
    console.log('File closed');
  })
  .on('error', (err) => {
    console.error(err);
  });
