const fs = require('fs');

let content = '1234567890';
let iterations = 15;

const streamWriting = fs.createWriteStream('./files/my_file2.txt');

for (let index = 0; index < iterations; index++) {
  content += content;

  streamWriting.write(content, () => {
    console.log('...');
  });
}

fs.writeFile('./files/my_file.txt', content, () => {
  console.log('Direct writing finished');
});
