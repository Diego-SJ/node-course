function login() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(console.log('login ok'));
    }, 1500);
  });
}

function userData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(console.log('data ok'));
    }, 1500);
  });
}

async function userAuth() {
  try {
    await login();
    await userData();
  } catch (error) {
    console.log(error);
  }
}

userAuth();
