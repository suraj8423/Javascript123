const testArray = [1,2,3,4,5];


// --------------------------------- Map ---------------------------------------------------------

Array.prototype.myMap = function(cb) {
    if(typeof cb !== 'function'){
        throw new TypeError('Callback must be a function');
    }
    // if array is null or undefined
    if(this === null || this === undefined) {
        throw new TypeError('Array is null or undefined');
    }

    let result = [];
    for(let i=0;i<this.length;i++){
        result.push(cb(this[i],i,this));
    }
    return result;
}

const temp = testArray.myMap((item) => {
    return item*2;
});
// console.log(temp);

// --------------------------------- Filter ---------------------------------------------------------

Array.prototype.myFilter = function(cb) {
    if(typeof cb !== 'function'){
        throw new TypeError('Callback must be a function');
    }
    // if array is null or undefined
    if(this === null || this === undefined) {
        throw new TypeError('Array is null or undefined');
    }

    let result = [];
    for(let i=0;i<this.length;i++){
        if(cb(this[i],i,this)) {
            result.push(this[i]);
        }
   
}
return result;
}

const temp1 = testArray.myFilter((item) => {
    return item > 1;
});
 // console.log(temp1);

// --------------------------------- Reduce ---------------------------------------------------------

Array.prototype.myReduce = function(cb,initialValue){
    if(typeof cb !== 'function'){
        throw new TypeError('Callback must be a function');
    }
    // if array is null or undefined
    if(this === null || this === undefined) {
        throw new TypeError('Array is null or undefined');
    }

    let accumulator = initialValue;

    for(let i=0;i<this.length;i++){
        if(accumulator === undefined) {
            accumulator = this[i];
        } else {
            accumulator = cb(accumulator, this[i], i, this);
        }
    }
    return accumulator;
}

const temp2 = testArray.myReduce((acc, item) => {
    return acc + item;
}, 0);
 // console.log(temp2);

//--------------------------------------------------------- call ----------------------------------------------------------------------


 Function.prototype.myCall = function (context,...args){
    if(typeof this !== 'function') {
        throw new Error("this is not a function");
    }

    context.fn = this;
   // console.log(context,args);
    context.fn(args);
    delete context.fn;
 }

 function temp123(tooth){
   // console.log(tooth + this.name);
 }

 const zebru = {name : "suraj"};

 temp123.myCall(zebru,"Hi","hello","how are you");

 // -------------------------------------------------- apply -----------------------------------------------------------

 Function.prototype.myApply = function (context,args) {
      if(typeof this !== 'function'){
          throw new Error("some error message");
      }
      if(!Array.isArray(args)) {
          throw new TypeError("some message");
      }

      context.fn = this;
      context.fn(...args);
      delete context.fn;
 }


// -------------------------------------------------- bind -----------------------------------------------------------

Function.prototype.myBind = function (context,...args){
    if(typeof this !== 'function'){
        throw new Error("some error message");
    }

    context.fn = this;
    return function (...someArgs) {
        return context.fn(...someArgs,...args);
    }
}

//----------------------------------------------------- memoize --------------------------------------------------------

function toughMultiplication(num1, num2) {
    for(let i = 0; i < 100000000; i++){}; // simulate heavy work
    return num1 * num2;
 }
 
//  console.time("First call");
//  console.log(toughMultiplication(1, 2));
//  console.timeEnd("First call");
 
//  console.time("Second call"); // ✅ Capital "S"
//  console.log(toughMultiplication(1, 2));
//  console.timeEnd("Second call"); // ✅ Matching label


 // solution for this is to make the polyfill of memoize;

 function memoizeRes(fun,context){
     let res= {};

     return function (...args){
         const tempResult = JSON.stringify(args);
         if(!res[tempResult]){
            res[tempResult] = fun.call(context,...args);
         }
         return res[tempResult];
     }
 }
 
 // now check the solution

 const memoizedfun = memoizeRes(toughMultiplication);

 console.time("First call");
 console.log(memoizedfun(10000, 0.000232402324));
 console.timeEnd("First call");
 
 console.time("Second call"); // ✅ Capital "S"
 console.log(memoizedfun(10000, 0.000232402324));
 console.timeEnd("Second call"); // ✅ Matching label