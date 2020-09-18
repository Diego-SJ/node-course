const fs = require('fs');
const EventEmitter = require('events');
const streamWriting = fs.createWriteStream('./files/file.txt');

class Emisor extends EventEmitter {}
const myEmisor = new Emisor();

function writeInFile() {
  let iterations = 5;

  for (let i = 0; i < iterations; i++) {
    streamWriting.write(`Iteration #${i}\n`);
  }
  streamWriting.write('==== END ====');
  streamWriting.end();
}

function notificationPush() {
  console.log('Preparing email...');
  setTimeout(() => {
    myEmisor.emit('notificationOk');
  }, 2000);
}

function readFiles() {
  fs.readFile('./files/file.txt', (err, doc) => {
    console.log(doc.toString());
  });
}

streamWriting.on('close', () => {
  notificationPush();
});

myEmisor.on('notificationOk', () => {
  readFiles();
});

writeInFile();
