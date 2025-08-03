// ----------------------------------------------- Promises interview -------------------------------------------------

console.log("start");

const promise1 = new Promise((resolve, reject) => {
    console.log(1);
    resolve(2);
});

promise1.then((res) => {
    console.log(res);
})

console.log("end");

// Output: start 1 end 2

// javascript is single threaded, so it will execute the synchronous code first and then the asynchronous code.

// ----------------------------------------------------------------------------------------------------------------------------------

console.log("start");

const promise2 = new Promise((resolve, reject) => {
    console.log(1);
});

promise2.then((res) => {
    console.log(res);
})

console.log("end");

// Output: start 1 end
// enjine will not go inside the promise until either it is resolved or rejected

// ----------------------------------------------------------------------------------------------------------------------------------

console.log("start");

const promise3 = new Promise((resolve, reject) => {
    console.log(1);
    reject();
});

promise3.then((res) => {
    console.log(res);
}).catch((err) => {
    console.log("error");
});

console.log("end");

// Output: start 1 error end
// if the promise is rejected, it will go to the catch block

// ----------------------------------------------------------------------------------------------------------------------------------

const firstPromise = new Promise((resolve, reject) => {
        resolve("first");
});

const secondPromise = new Promise((resolve,reject) => {
   resolve(firstPromise);
});

secondPromise.then((res) => {
     return res;
}).then((res) => {
    console.log(res);
});


// Output: first

// ----------------------------------------------------------------------------------------------------------------------------------

