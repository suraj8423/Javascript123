// What is object in js ==>
// JavaScript is designed on an object-based paradigm. An object is a collection of properties, and a property
// is an association between a name (or key) and a value. A property's value can be a function, in which case the
// property is known as a method.

// Objects in JavaScript, just as in many other programming languages, can be compared to objects in real life.
// In JavaScript, an object is a standalone entity, with properties and type. Compare it with a cup, for example. A cup is an object,
//  with properties. A cup has a color, a design, weight, a material it is made of, etc. The same way,
//  JavaScript objects can have properties, which define their characteristics.

const user = {
  name: "Rishabh",
  age: 25,
  isAwesome: true,
};

delete user.age;

// console.log(user);

for (key in user) {
  //   console.log(key, user[key]);
}

// -------------------------------------------------------------------------------------------------------------------------------

// Question 1 - What will the the output

const obj = {
  a: 1,
  b: 2,
  a: 3,
};

// key shouls be unique , here a will be replaced by 3

// console.log(obj);

// -------------------------------------------------------------------------------------------------------------------------------

// Question 2 ==> Create a function multiplyByTwo(obj) which multiplies all numeric property values of num two

let nums = {
  a: 100,
  b: 200,
  title: "My nums",
};

const multiplyByTwo = (obj) => {
  for (key in obj) {
    if (typeof obj[key] === "number") obj[key] = obj[key] * 2;
  }
};

multiplyByTwo(nums);

// console.log(nums);

// -------------------------------------------------------------------------------------------------------------------------------

// Question 3 ==> O/P of the following code

const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123; // a["[object object]"] = 123
a[c] = 456; // a["[object object]"] = 456

// when we try to convert an object to a string it will call toString method which will return [object Object]

// console.log(a[b]); // 456

// -------------------------------------------------------------------------------------------------------------------------------

// Question ==> O/P of the following code

// console.log([..."Rishabh"]); // ["R","i","s","h","a","b","h"]

// -------------------------------------------------------------------------------------------------------------------------------

// Question ==> O/P of the following code

const settings = {
  user: "Rishabh",
  level: 19,
  health: 95,
};

const data = JSON.stringify(settings, ["level", "health"]); // it will stringify only level and health

// console.log({ data }); // '{"level":19,"health":95}'

// so this is how we convert an object to a string
// if we want to convert it back to object we can use JSON.parse(data)
// real time use can be to stire in local storage

// -------------------------------------------------------------------------------------------------------------------------------

// Question ==> O/P of the following code

let greet1 = {
  greeting: "Hey!",
};

let greet2;
greet2 = greet1;

greet1.greeting = "Hello";

// console.log( greet2 ); // will print Hello, since we not only pass the value but reference

// -------------------------------------------------------------------------------------------------------------------------------

// Question ==> O/P of the following code

// console.log({ a: 1 } == { a: 1 }); // false
// console.log({ a: 1 } === { a: 1 }); // false

// since js will compare the reference , it will be true only when the point to same reference strict check or not does not matter

// -------------------------------------------------------------------------------------------------------------------------------

// Question ==> O/P of the following code

let person = { name: "Rishabh" };

let members = [person];

person = null;

// console.log(members); // will print [{name: "Rishabh" }], since person ==> members[0]

person = { name: "Rish" };

members = [person];

person.name = null;

// console.log(members); // will print [{name: null }]

// -------------------------------------------------------------------------------------------------------------------------------

// Question ==> O/P of the following code

const value = { number: 10 };

function multiply(x = { ...value }) {
  //   console.log((x.number *= 2));
}

multiply(); // 20 will take default value in x
multiply(); // 20 will take default value in x
multiply(value); // 20 , will take reference of value in x and modify that
multiply(value); //40

// -------------------------------------------------------------------------------------------------------------------------------

// Question ==> O/P of the following code

function changeAgeAndReference(person) {
  person.age = 25;
  person = {
    name: "John",
    age: 50,
  };
  return person;
}

const personObj1 = {
  name: "Alex",
  Age: 28,
};

const personObj2 = changeAgeAndReference(personObj1);

console.log(personObj1); // {name:"Alex",age:25} since we were re-assigning it to some other object it will not change the reference
console.log(personObj2); // {name:"John",age:50}

// -------------------------------------------------------------------------------------------------------------------------------

// Question ==> what is shallow copy and deep copy

// A shallow copy of an object is a copy whose properties share the same references (point to the same underlying values) as
// those of the source object from which the copy was made. As a result, when you change either the source or the copy,
// you may also cause the other object to change too. A deep copy of an object is a copy whose properties
// do not share the same references (point to the same underlying values) as those of
// the source object from which the copy was made. As a result, when you change either the source or the copy,
//  you can be assured you're not causing the other object to change too.
// thera are some ways you can clone an object one is {...user} and other is JSON.parse(JSON.stringify(user))

// -------------------------------------------------------------------------------------------------------------------------------

const tempuser = {name: "Lydia", age : 21};
const admin = {admin: true,...user};

console.log(admin); // {admin: true, name: "Lydia", age: 21}

// -------------------------------------------------------------------------------------------------------------------------------


let user1 = {
   name : "Suraj Tripathi",
   age: 25,
   fullName : {
    firstName : "Suraj",
    lastName : "Tripathi"
   }
}

const name = "mahesh";

const {fullName : {firstName}} = user1;

console.log(firstName); // Suraj


