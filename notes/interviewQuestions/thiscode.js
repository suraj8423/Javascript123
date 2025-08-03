// this simply is a used to represent the object and in javascript everything is object.

this.a = 10; // defining a property 'a' on the global object
console.log(this.a); // 10


// so if you want to understand the context of this in javascript, see in javascript everything is an object now assume that first object is 
// global then inside that we are creating other objects and all are connected to the global object.


function myFunction() {
  console.log(this.a); // 10, here this refers to the global object
}
// here function is also an object and when we call it, it will refer to the global object
myFunction(); // 10


// so this points to either the object or to the parent of the object and one more thing first check who is calling the method.

let user = {
    name: "Suraj",
    age : 24,
    getDetails: function() {
        console.log(this.name + " is " + this.age + " years old.");
    }
}

user.getDetails(); // Suraj is 24 years old. Here this refers to the user object

//----------------------------------------------------------------------------------------------------------------------

let user2 = {
    name : "Suraj",
    age: 24,
    childObj : {
        newName: "Rishabh",
        getDetails: function() {
            console.log(this.newName + "and " + this.name );
        }
    }
}

user2.childObj.getDetails(); // Rishabh and undefined, here this refers to the childObj object and it does not have a property name so it returns undefined

//------------------------------------ Arrow Functions -------------------------------------------------------------

let user3 = {
    name: "Suraj",
    age : 24,
    getDetails: () => {
        console.log(this.name);
    }
}

user3.getDetails(); // undefined, here this refers to the global object and it does not have a property name so it returns undefined

// It’s defined inside the object user3 but not executed as a method on the object.

// In JavaScript, objects are not scopes — only functions create scope.

// So the this inside the arrow function refers to the this of the scope where user3 is defined — which is likely the global scope (or module scope in strict mode).

let user4 = {
    name: "Suraj",
    age : 24,
    getDetails() {
        const innerFunction = () => {
            console.log(this.name + " is " + this.age + " years old.");
        };
        innerFunction(); // Suraj is 24 years old. Here this refers to the user4 object
    }
}

user4.getDetails(); // Suraj is 24 years old. Here this refers to the user4 object

// see here the innerfunction is present inside the getDetails scope so it can access the this of the getDetails method which is user4 object


// -------------------------------- Behavior of this inside the constructor function ---------------------------------------------

class User {
    constructor(name) {
        this.name = name; // here this refers to the instance of the User class
    }

    getName(){
        return this.name; // here this refers to the instance of the User class 
    }

    // here this refers to all the variables of the class present in the constructor
}

const user5 = new User("Suraj");
console.log(user5.getName()); // Suraj, here this refers to the user5 object


// ------------------ most important part of this -----------------------------

// first check if it is normal function or arrow function
// if it is normal function then check who is calling the function
// if it is called as a method of an object then this refers to that object
// if it is called as a normal function then this refers to the global object
// if it is an arrow function then this refers to the scope where the function is defined

//----------------------------------------------------------------------------------------------------------------------------------

function makeUser(){
    return {
        name : "John",
      ref : this
    };
  }
  
  let user6 = makeUser();
  console.log(user6.ref.name); // undefined, here this refers to the global object and it does not have a property name so it returns undefined

  // now fix this and call name John only

  function makeUser1(){
    return {
        name : "John",
         ref() {
        return this; // here this refers to the object returned by makeUser1    
      } 
    };
  }
  
  let user7 = makeUser();
  console.log(user7.ref().name);


// -------------------------------------------------------------------------------------------------------------------------------

const user8 = {
    name: "Rishabh",
    logMessage: function() {
        console.log(this.name + " says hello!");
    }
}

setTimeout(user8.logMessage, 1000); // undefined, here this refers to the global object because setTimeout calls the function as a normal function

setTimeout(() => user8.logMessage(), 1000); // Rishabh says hello!, here this refers to the user8 object because we are using arrow function