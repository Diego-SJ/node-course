const https = require('https');
const util = require('util');

const query = https.get('https://pokeapi.co/api/v2/pokemon/1', (res) => {
  console.log('data ok');
  res.on('data', (data) => {
    console.log('fetching data...');
  });
  res.on('end', (data) => {
    console.log('http end');
  });
});

query.on('socket', () => {
  console.log('http start');
});

query.on('error', (err) => {
  console.log(`${err}`);
});
