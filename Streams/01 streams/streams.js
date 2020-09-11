const fs = require('fs');

console.time('Response time');

// * BAD
// for (let i = 0; i <= 10; i++) {
//   fs.readFileSync('file.txt', 'utf8');
// }


// * GOOD
for (let i = 0; i <= 10; i++) {
  const streamWrite = fs.createReadStream('file.txt', {
    encoding: 'utf-8',
  });
}

console.timeEnd('Response time');
