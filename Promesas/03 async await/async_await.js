function randomNumber() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 100));
    }, 2000);
  });
}

async function result() {
  console.log('Result invok');
  const random = await randomNumber();
  console.log(`Result: ${random}`);
}

result();
