// --------------------------------------------- Call Bind Apply ---------------------------------------------
// Call, Bind, and Apply are methods in JavaScript that allow you to control the context

// in which a function is executed. They are particularly useful when you want to invoke a function with a specific `this` value.
// Call: Invokes a function with a specified `this` value and arguments.
// Bind: Returns a new function that, when called, has its `this` keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.
// Apply: Similar to call, but takes an array of arguments instead of a list of arguments

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
