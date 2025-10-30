const firstPromise = new Promise((resolve, reject) => {
        resolve("first");
});

const secondPromise = new Promise((resolve,reject) => {
   resolve(firstPromise);
});

secondPromise.then((res) => {
    console.log(res)
     return res;
}).then((res) => {
    console.log(res);
});