const fs = require('fs');
const util = require('util');

// fs.writeFile('./files/file.txt', 'hello world', () => {
//   console.log('ok');
// });

const writeFilePromise = util.promisify(fs.writeFile);

writeFilePromise('./files/file.txt', 'hello world')
  .then(() => {
    console.log('Ok');
  })
  .catch((err) => {
    console.log(err);
  });
