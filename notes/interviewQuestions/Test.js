// check rest and spread operator from hoisting video once.
// Read about Module pattern in javascript.
// watch closeure last 10 minutes of the video again.
// currying
// cookies, local storage, session storage
// this ka bhi last dekh lenaf


// var x = 5;

// function temp() {
//     console.log(x);
//     var x = 10;
// }

// temp();
// console.log(x);


// function Counter() {
//     var _counter = 0;
//     function increament(count){
//         _counter += count;
//     }

//     function getCount() {
//         return _counter;
//     }

//     return {
//         increament,
//         getCount
//     };
// }

// const counter1 = Counter();

// counter1.increament(5);
// counter1.increament(50);
// console.log(counter1.getCount());


// const property = "name";
// const name = "suraj";

// const person = {
//    [property]: name,
// }


// console.log(person);

// const user = {
//     name : "Suraj",
//     age: 25,
//     isTotallyAwesome: true,
// }

// for(const key in user) {
//     console.log(`${key} : ${user[key]}`);
// }

// let nums = {
//     a : 100,
//     b : 200,
//     title : "My nums",
// }

// function multiplyByTwo(obj) {
//     for(const key in obj){
//         if(typeof obj[key] === "number"){
//             obj[key] = obj[key] * 2;
//         }
//     }
// }

// multiplyByTwo(nums)

// console.log(nums);


// const user8 = {
//     name: "Rishabh",
//     logMessage: function() {
//         console.log(this.name + " says hello!");
//     }
// }

// setTimeout(user8.logMessage, 1000); // undefined, here this refers to the global object because setTimeout calls the function as a normal function

// setTimeout(() => user8.logMessage(), 1000); // Rishabh says hello!, here this refers to the user8 object because we are using arrow function


// class Student {
//     constructor(){
//         this.name = "Suraj";
//         this.age = 25;
//     }

//     getDetails() {
//         return "I am details";
//     }
// }

// const student1 = new Student();
// console.log(student1); // Suraj

function sum(a) {
    return function(b){
        return function(c){
            return a+b+c;
        }
    }
}

console.log(sum(2)(4)(6));

// sum(2,4,6) ===> sum(2)(4)(6)