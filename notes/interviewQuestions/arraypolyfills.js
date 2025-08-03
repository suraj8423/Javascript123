const arr1 = [1, 2];

// arr1.map((num, index, arr) => {
//   return num;
// });

function myMap(callback) {
  const newArr = [];
  for (var i = 0; i < this.length; i++) {
    newArr.push(callback(this[i], i, this));
  }
  return newArr;
}
Array.prototype.myMap = myMap;

const result = arr1.myMap((i, index) => i + index);
console.log({ result });

// arr1.filter((num, index, arr) => {
//   return num > 0;
// });

function myFilter(callback) {
  const temp = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      temp.push(this[i]);
    }
  }
  return temp;
}

Array.prototype.myFilter = myFilter;

const filteredArray = arr1.filter((num) => num > 1);
console.log({ filteredArray });

// arr1.reduce((acc, current, index, arr) => {}, initialValue);

function myReduce(callback, initialValue) {
  if (this.length === 0 && initialValue === undefined) {
    throw new TypeError("Reduce of empty array with no initial value");
  }
  let acc = initialValue;
  let startIndex = 0;

  // If initialValue is not provided, use the first element as the initial value
  // and start iteration from the second element.
  if (initialValue === undefined) {
    acc = this[0];
    startIndex = 1;
  }
  for (let index = startIndex; index < this.length; index++) {
    acc = callback(acc, this[index], index, this);
  }
  return acc;
}

Array.prototype.myReduce = myReduce;
const res1 = arr1.myReduce((acc, curr) => {
  return acc + curr;
});
console.log({ res1 });
const res2 = [].myReduce((acc, curr) => {
  return acc + curr;
});

console.log({ res2 });

// Map Vs forEach

// map(): Transforms array elements and returns a new array.
// forEach(): Iterates over array elements, performs side effects, but returns undefined.
// Use map() when you need a new array with transformed values, and forEach() for side effects without needing a result.
