// What is currying? ==> Currying is a function that takes one argument at a time and returns a function
// that expects next argument for eg => f(a,b) ==> f(a)(b)
// and currying functions are created by chaining closures by immediately returning their inner functions simultaneously

// Why should currying be used?
// Following are the reasons why currying is good :

// ✅ It makes a function pure which makes it expose to less errors and side effects.

// ✅ It helps in avoiding the same variable again and again.

// ✅ It is a checking method that checks if you have all the things before you proceed.

// ✅ It divides one function into multiple functions so that one handles one set of responsibility.

// For Example

function f(a) {
  return function (b) {
    return `${a} ${b}`;
  };
}

// console.log(f(5)(6));

// -------------------------------------------------------------------------------------------------------------------------------

// Question sum(2)(6)(1)

function sum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

// console.log(sum(2)(6)(1));

// -------------------------------------------------------------------------------------------------------------------------------

// Question 2 -
// evaluate("sum")(4)(2) ==> 6
// evaluate("multiply")(4)(2) ==> 8
// evaluate("subtract")(4)(2) ==> 2
// evaluate("divide")(4)(2) ==> 2

function evaluate(operation) {
  return function (a) {
    return function (b) {
      if (operation === "sum") return a + b;
      if (operation === "multiply") return a * b;
      if (operation === "subtract") return a - b;
      if (operation === "divide") return a / b;
      return "Invalid operation";
    };
  };
}

// console.log(evaluate("sum")(4)(2));
// console.log(evaluate("multiply")(4)(2));
// console.log(evaluate("subtract")(4)(2));
// console.log(evaluate("divide")(4)(2));
// console.log(evaluate("sdivideum")(4)(2));

// -------------------------------------------------------------------------------------------------------------------------------

// Question 3 - Infinite currying
//  sum(1)(2)(3)(4).....(n)

// sum(1)(2)(3) ==> 6
// sum(1)(3)(4)(8) ==> 16

const add = (a) => {
  return (b) => {
    if (b) return add(a + b);
    return a;
  };
};

// console.log(add(1)(2)(3)(133)());

// -------------------------------------------------------------------------------------------------------------------------------

// Question 4 - Currying vs Partial Application

// Partial application is a technique where a function is preloaded with some arguments,
//  returning a new function that takes the remaining arguments.

// Currying
// Transforms a function into a series of unary (single-argument) functions.
// Each function call returns a new function until all arguments are provided.
// Used in functional programming for better function composition.
// Example: sum(2)(3)(4); → Calls happen one argument at a time.
// Can be implemented using recursion or by returning nested functions.

// Partial Application
// Pre-applies some arguments to a function, returning a new function that takes the remaining arguments.
// Allows multiple arguments to be passed at once after preloading some values.
// Useful for creating reusable functions with preset values.
// Example: sum(2, 3)(4); → Some arguments are fixed upfront.
// Can be implemented using .bind() or by returning a function with spread paramet

// -------------------------------------------------------------------------------------------------------------------------------

// Question 5 - Manipulating DOM

function updateElement(id) {
  return function (content) {
    document.getElementById(id).textContent = content;
  };
}

const updateHeader = updateElement("heading");

updateHeader("Hi Rishabh");

// -------------------------------------------------------------------------------------------------------------------------------

// Question 6 - curry() implementation
// Converts f(a,b,c) to f(a)(b)(c)

function curry(func) {
  return function curriedFunction(...args) {
    if (args.length >= func.length) return func(...args);
    return function (...next) {
      return curriedFunction(...args, ...next);
    };
  };
}

const sumFunc = (a, b, c, d) => a + b + c + d;

const totalSumFunc = curry(sumFunc);

console.log(totalSumFunc(1)(3)(4)(2));
