// --------------------------------------------- Call Bind Apply ---------------------------------------------
// Call, Bind, and Apply are methods in JavaScript that allow you to control the context

// in which a function is executed. They are particularly useful when you want to invoke a function with a specific `this` value.
// Call: Invokes a function with a specified `this` value and arguments.
// Bind: Returns a new function that, when called, has its `this` keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.
// Apply: Similar to call, but takes an array of arguments instead of a list of arguments

// 🔹 Key Rule for Arrow Functions

// 👉 Arrow functions do not have their own this.
// Instead, they lexically inherit this from their enclosing scope (the environment where they were created).

// That means:

// call, apply, and bind cannot change this inside an arrow function.

// They only affect regular functions, not arrow functions.
//Example 1: Normal Function vs Arrow Function with call

const personX = {
  name: "Suraj"
};

function normalFunc() {
  console.log("Normal function:", this.name);
}

const arrowFunc = () => {
  console.log("Arrow function:", this.name);
};

// Calling with call()
normalFunc.call(personX); // Normal function: Suraj
arrowFunc.call(personX);  // Arrow function: undefined (or error in strict mode)
    
// Example 2: bind with Arrow Function

const personY = { name: "Tripathi" };

const arrowFuncY = () => {
  console.log("Arrow bound:", this.name);
};

const boundArrow = arrowFunc.bind(personY);
boundArrow(); // Arrow bound: undefined

//Even though we used bind(person), the arrow function’s this is not re-bound.
// It will still use the surrounding lexical this (in this case, the global scope, where this.name is undefined).

// Example 3: Arrow inside a Method

const personZ = {
  name: "Suraj",
  regularMethod: function () {
    console.log("Regular:", this.name);
  },
  arrowMethod: () => {
    console.log("Arrow:", this.name);
  }
};

personZ.regularMethod(); // Regular: Suraj
personZ.arrowMethod();   // Arrow: undefined

//🔎 Explanation:

//regularMethod → this refers to person.

// arrowMethod → this is inherited from where arrowMethod was defined (the outer scope, not person).

// Example 4: Arrow Inside Regular Function (Lexical this)

const personA = {
  name: "Suraj",
  show: function () {
    const arrow = () => {
      console.log("Arrow inside method:", this.name);
    };
    arrow();
  }
};

personA.show(); // Arrow inside method: Suraj
// ✅ Here, the arrow function inherits this from show, which is called on person.
// So in this case, arrow function does capture the object context indirectly.

// ---------------------------------------------- Call ---------------------------------------------------------

var obj = {
    name : "Suraj",
}

function sayHello(){
    return "Hello " + this.name;
}

// console.log(sayHello()); // Hello
// but what if we want to call this function with the context of obj? means i want the `this` keyword to refer to obj
// console.log(sayHello.call(obj)); // Hello Suraj

// and if we want to pass arguments to the function as well, we can do that too

function greet(greetings){
    return greetings + " " + this.name;
}
// console.log(greet.call(obj, "Hi")); // Hi Suraj

// ---------------------------------------------- Apply ---------------------------------------------------------

// apply is similar to call, but it takes an array of arguments instead of a list of arguments
// console.log(greet.apply(obj, ["Hi"]));

// ---------------------------------------------- Bind ---------------------------------------------------------

const boundGreet = greet.bind(obj);

//console.log(boundGreet("Hello")); // Hello Suraj

// now this is a reusable function, we can call it multiple times without passing the context again
// console.log(boundGreet("Hi")); // Hi Suraj

// ----------------------------------------------- Interview Question ---------------------------------------------------------

const person = {name : "Suraj"};

function sayHi(age){
    return `${this.name} is ${age} years old`;
}

// console.log(sayHi.call(person, 25)); // Suraj is 25 years old
// console.log(sayHi.apply(person, [25])); // Suraj is 30 years old
// console.log(sayHi.bind(person, 25)); // [Function: bound sayHi]

// --------------------------------------------------------------------------------------------------------------

const age = 10;

var person1 = {
    name: "Suraj",
    age: 20,
    getAge: function() {
        return this.age;
    }
};

var person2 = {age: 30};
//console.log(person1.getAge.call(person2));

// ---------------------------------------------------------------------------------------------------------------------

const animals = [
    {species : "Lion", name: "King"},
    {species : "Tiger", name: "Shera"},
]

function printAnimals(i){
    this.print = function() {
       //  console.log("#" + i + " " + this.species + ": " + this.name);
    };
    this.print();
}

for(let i = 0; i < animals.length; i++) {
    printAnimals.call(animals[i], i);
}

// ---------------------------------------------------------------------------------------------------------------------
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
// concat these two arrays using apply
arr1.push.apply(arr1,arr2);
// console.log(arr1); // [1, 2, 3, 4, 5, 6]

// ---------------------------------------------------------------------------------------------------------------------

// find max/min in an array
const arr3 = [1,2,3,4,5,6,7];
// now we have function like Math.max() but if we will pass the array directly, it will not work
// console.log(Math.max(arr3)); // NaN

// console.log(Math.max.apply(null,arr3));

// ---------------------------------------------------------------------------------------------------------------------

function f() {
    console.log(this);
}

let user = {
    g : f.bind(null)
}

user.g();
// in strict mode, this will be undefined
// in non-strict mode, this will be the global object (window in browsers)

// ---------------------------------------------------------------------------------------------------------------------

function f() {
    // console.log(this.name);
}

f = f.bind({name: "Suraj"}).bind({name: "John"});
// Suraj .... once a function is bound to a context, it cannot be bound again to a different context

// ---------------------------------------------------------------------------------------------------------------------

function checkPassword(success,failure) {
    // const password = prompt("Enter password:");
    // if(password === "12345") {
    //     success();
    // } else {
    //     failure();
    // }
}

let user1 = {
    name:"Suraj",
    loginSuccessful() {
       // console.log(`${this.name} logged in successfully!`);
    },
    loginFailed() {
        // console.log(`${this.name} failed to log in.`);
    }
}

// checkPassword(user1.loginSuccessful.bind, user1.loginFailed);

// correct the above code as it is not giving the corrext result.

// correct code will be
checkPassword(
    user1.loginSuccessful.bind(user1), 
    user1.loginFailed.bind(user1)
);

// --------------------------------------- Arrow Functions ---------------------------------------------------------

const age1 = 10;

const person3 = {
    name :"Suraj",
    age1:20,
    getAgeArrow : () => {
      //  console.log(this.age1);
    },
    getAge : function (){
       //  console.log(this.age1);
    }
}

var person4 = {age1 : 24};

person3.getAgeArrow.call(person4); // getAgeArrow does not have any parent function so it will take reference from window directly.
person3.getAge.call(person4); // 24
