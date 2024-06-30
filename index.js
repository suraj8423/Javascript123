// console.log(this.a);
//let z = 10;
// console.log(a);
// console.log(this.a);
// console.log(this.b);

// var b = 10;
// console.log(this.b);

// for (let i = 0; i < 3; i++) {
//   setTimeout(function () {
//     console.log(this.i);
//     console.log(i);
//   }, 1000);
// }
// console.log("var");
// for (var i = 0; i < 3; i++) {
//   setTimeout(function () {
//     console.log(this.i);
//     console.log(i);
//   }, 1000);
// }

// let a=10;
// {
//     var a=20;
// }

// for (let i = 1; i <= 5; i++) {
//   console.log(i);
// }

// function a() {
//   console.log("Hello i am a");
// }

// const b = function d() {
//   console.log(d);
// };

// const c = function () {
//   console.log("Hello i am c");
// };
// a();
// b();
// c();

// function addEventListener() {
//   let count = 0;
//   const button = document.getElementById("clickMe");

//   if (button) {
//     button.addEventListener("click", function xyz() {
//       console.log("button clicked", ++count);
//     });
//   } else {
//     console.error('Element with id "clickMe" not found');
//   }
// }

// addEventListener();
// function area(radis) {
//   return 2 * radis;
// }
// const radius = [1, 2, 3, 4];
// console.log(radius.map(area));
// console.log(radius.filter((x) => 2 * x < 8));

// const p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("hey buddy you are doing great!");
//   }, 5000);
// });

// async function fun() {
//   const temp = await p;
//   console.log(temp);
// }

// function temp() {
//   p.then((val) => {
//     console.log("dada");
//     console.log("didi");
//   });
//   console.log("ramesh");
// }

// temp();
// console.log(a); // ReferenceError: Cannot access 'a' before initialization
// console.log(b); // prints undefined as expected
// let a = 10;
// console.log(a); // 10
// var b = 15;
// console.log(window.a); // undefined
// console.log(window.b); // 15
// var a = 10;
// var a=20;
// console.log(a)

// var b = function xyz() {
//   console.log("b called");
// };
// b(); // "b called"
// xyz();

// document.getElementById("clickMe").addEventListener("click", () => {
//   console.log("Hey! i got clicked");
// });

function attachEventList() {
  //creating new function for closure
  let count = 0;
  document.getElementById("clickMe").addEventListener("click", function xyz() {
    console.log("Button clicked", ++count); //now callback function forms closure with outer scope(count)
  });
}
attachEventList();
