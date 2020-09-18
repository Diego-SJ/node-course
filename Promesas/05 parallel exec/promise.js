function privateMessages() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ messages: ['hello', 'hi'] });
    }, 3000);
  });
}

function gallery() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ gallery: ['photo1', 'photo2'] });
    }, 2000);
  });
}

function transactions() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ transactions: ['t1', 't2'] });
    }, 1500);
  });
}

Promise.all([privateMessages(), gallery(), transactions()])
  .then((results) => {
    console.log(results);
  })
  .catch((err) => {
    console.log(err);
  });
