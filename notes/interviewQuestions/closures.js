// lexical scope == > A variable defined outside the function can be accessed inside a function, but not vice versa
// closures ==>  a closure gives a function access to its outer scope.
// In JavaScript, closures are created every time a function is created, at function creation time.

// Closure scope chain
// A nested function's access to the outer function's scope includes the enclosing scope of the outer function—effectively creating a chain of function scopes. To demonstrate, consider the following example code.

// Shadowing == > Variable shadowing occurs when a variable of an inner scope is defined
// with the same name as a variable in the outer scope.In the inner scope, both variables’ scope overlap.

// Scope:
// Scope determines where variables can be accessed in a program. It includes global scope, function scope, and block scope.

// Closure:
// A closure is a function that remembers variables from its outer scope even after the outer function has finished executing.

// global scope
const e = 10;
function sum(a) {
  return function (b) {
    return function (c) {
      // outer functions scope
      return function (d) {
        // local scope
        return a + b + c + d + e;
      };
    };
  };
}

console.log(sum(1)(2)(3)(4)); // 20

var username = "Rishabh";

function local() {
  console.log(username);
}

local();
// -------------------------------------------------------------------------------------

function subscribe() {
  var name = "Rishabh";
  function displayName() {
    console.log(name);
  }
  displayName();
}

subscribe();

const createBase = (num1) => {
  return function (num2) {
    return num1 + num2;
  };
};

var addSix = createBase(6);
console.log(addSix(10)); // returns 16

// -------------------------------------------------------------------------------------

// Question 3 ==> Time optimization

function find(index) {
  let a = [];
  for (let i = 0; i < 1000000; i++) {
    a[i] = i * i;
  }

  console.log(a[index]);
}

console.time("6");
find(6);
console.timeEnd("6");
console.time("50");
find(50);
console.timeEnd("50");

function optimizedFind() {
  let a = [];
  for (let i = 0; i < 1000000; i++) {
    a[i] = i * i;
  }
  return function (index) {
    return console.log(a[index]);
  };
}

const closure = optimizedFind();

console.time("6");
closure(6);
console.timeEnd("6");
console.time("50");
closure(50);
console.timeEnd("50");

// -------------------------------------------------------------------------------------

// Question ==> What will be the o/p .. we want to implement a time function

function a() {
  for (var i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
}

a();

// 1 solution will be to use let instead of var

function b() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
}

b();

// 2nd solution will be using closures with var

function c() {
  for (var i = 0; i < 3; i++) {
    function innerFunction(num) {
      setTimeout(() => {
        console.log({ num });
      }, num * 1000);
    }
    innerFunction(i);
  }
}

c();

// -------------------------------------------------------------------------------------

// Question ==> Use closure to create a private counter

function counter() {
  var _counter = 0;
  function increment(count) {
    _counter += count;
  }
  function getCount() {
    return _counter;
  }
  return {
    increment,
    getCount,
  };
}

let counter1 = counter();

counter1.increment(5);
counter1.increment(50);
console.log("Heyy");
console.log(counter1.getCount());
// -------------------------------------------------------------------------------------

// Question module pattern in javascript

// The Module Pattern is a design pattern in JavaScript
// that allows encapsulation of private and public members using closures.
// It helps in structuring code by keeping variables and functions private, exposing only what is necessary.

// This pattern is often implemented using Immediately Invoked Function Expressions (IIFE)
// or ES6 modules to prevent global scope pollution.

// -------------------------------------------------------------------------------------

// Question ==> make this function run only once

// let view;
// function likeTheVideo() {
//   view = "Rishabh";
//   console.log("like the video", view);
// }

let view;
function likeTheVideo() {
  let count = 0;
  return function () {
    if (count > 0) console.log("Already liked the video");
    else {
      view = "Rishabh";
      console.log("like the video", view);
      count++;
    }
  };
}
const functionLikeTheVideo = likeTheVideo();
functionLikeTheVideo();
functionLikeTheVideo();

// -------------------------------------------------------------------------------------

// Question ==> polyfill of once

function once(fn, context) {
  let ran = false;
  let result;
  return function () {
    if (!ran) {
      ran = true;
      result = fn.apply(context || this, arguments);
      console.log({ result });
    }
    return result;
  };
}

const logOnce = once(() => 2 + 2);

console.log({ logOnce: logOnce(1) }); // Output: "This runs only once!"
console.log({ logOnce: logOnce(1) }); // No output

// -------------------------------------------------------------------------------------

// Question ==> Implement memoize function

function myMemoize(fn, context) {
  let cache = {};
  return function (...args) {
    const stringifiedArgs = JSON.stringify(args);
    if (!cache[stringifiedArgs]) {
      cache[stringifiedArgs] = fn.call(context || this, ...args);
    }
    return cache[stringifiedArgs];
  };
}

function clumsyProduct(num1, num2) {
  for (let i = 0; i < 1000000; i++) {}
  return num1 * num2;
}

const product = myMemoize(clumsyProduct);

console.log({ product: product(189, 292) });
console.log({ product: product(189, 292) });

console.time("Without Memoization");
console.log(clumsyProduct(189, 292)); // Slow computation
console.log(clumsyProduct(189, 292)); // Slow again
console.timeEnd("Without Memoization");

console.time("With Memoization");
console.log(product(189, 292)); // Slow first time
console.log(product(189, 292)); // Fast second time
console.timeEnd("With Memoization");
