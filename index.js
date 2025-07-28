const p1 = new Promise((resolve,reject,temp) => {
  console.log(temp);
  setTimeout(() => {
    resolve('p1 resolved');
    console.log(temp);
  }, 2000);
});

const p2 = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('p2 resolved');
  }, 1000);
});

async function runPromises() {
  const testp2 = await p2;
  console.log(testp2);
  const testp1 = await p1(testp2);
  console.log(testp1);
}

runPromises();