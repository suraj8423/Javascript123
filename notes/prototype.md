# Prototype in javascript

- Everything present in javascript is simply object.

```js
 String --------------> object -----------> null
 Array --------------> object -----------> null
 function -----------> object -----------> null

 so everything will come to object only it means whatever is present in object we can use it anywhere.
```

* Example of functions

```js

function multiplyBy5(num) {
   return num*5;
}

multiplyBy5.temp = 10;

console.log(multiplyBy5(10)); // 50
console.log(multiplyBy5.temp); // 10
console.log(multiplyBy5.prototype); // {}

So from this we concluded that everything in javascript is actually an object
```