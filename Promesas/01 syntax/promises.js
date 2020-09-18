const promiseNode = require('fs').promises;

promiseNode
  .copyFile('./files/original.txt', './files/copy.txt')
  .then(() => {
    console.log('copy finished');
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log('...');
  });
