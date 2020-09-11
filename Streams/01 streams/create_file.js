const fs = require('fs');
const file = fs.createWriteStream('file.txt');

for (let i = 0; i <= 1e6; i++) {
  file.write(
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus alias perferendis, sequi saepe in laborum, atque nulla adipisci facere accusamus asperiores. Aliquid dolor facilis alias voluptatem quam quaerat ipsa libero.',
  );
}

file.end();
