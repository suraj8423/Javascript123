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

function addEventListener() {
  let count = 0;
  const button = document.getElementById("clickMe");

  if (button) {
    button.addEventListener("click", function xyz() {
      console.log("button clicked", ++count);
    });
  } else {
    console.error('Element with id "clickMe" not found');
  }
}

addEventListener();
