# This keyword : Call, Bind and Apply 


- Whenever you are in global context, 'this' keyword is always points to window Object. 
- There is a thumb rule that this will either point to an object or it will points to undefined.

```js

// global 

console.log(this); // window

// called from the function 

function gfFunction() {
    console.log(this); // window
}

gfFunction();

// or we can call it like window.gfFunction()

```

```js
let bfObject = {
    name : 'suraj',
    age:'23', 
    gfFunction : function () {
        console.log(this);
    }
}

bfObject.gfFunction(); // this time gfFunction is associated to the object so it is pointing to the object and print the object details only

let say we are calling the function wrt window by passing reference

const gfRefFunction = bfObject.gfFunction();
gfRefFunction(); // this time again output will be window only
```

- So if the function has any object associated with it then 'this' will point to that object else it will point to the window object.
- or else if the function is called wrt object it is going to name that particular object else it will point to the window.

* This discussion is for the non-strict mode

* Now let's discuss for the strict mode

```js

// global 

console.log(this); // window

// called from the function 

function gfFunction() {
    console.log(this); // undefined
}

gfFunction();

```

```js
let bfObject = {
    name : 'suraj',
    age:'23', 
    gfFunction : function () {
        console.log(this);
    }
}

bfObject.gfFunction(); // this time gfFunction is associated to the object so it is pointing to the object and print the object details only

let say we are calling the function wrt window by passing reference

const gfRefFunction = bfObject.gfFunction();
gfRefFunction(); // this time again output will be window only
```

 - If there is no object associated with 'this', it will point to `undefined`. In non-strict mode, 'this' might point to the `window` object when there is no direct association with an object, but in strict mode, it will always point to `undefined` in such cases.

 # Call, apply and bind

 ```js
 const bf1Object = {
    name : 'Suraj',
    age:30,
    car:'audi',
    gfFunction: function (a,b) {
          console.log(a,b,this);
    }
 }

 const bf2Object = {
    name : 'Pradeep',
    age:33,
    car:'BMW',
    gfFunction: function (a,b) {
          console.log(a,b,this);
    }
 }

 bf1Object.gfFunction(1,2); // Here output will be Suraj object

 bf1Object.gfFunction(bf2Object,1,2); // Here output will be Pradeep object
 ```

 - We use call to change the reference.

 * apply also do the same thing but with one difference that it passes the values of the function in the array.

  - eg : bf1Object.gfFunction(bf2Object, [1,2])

* Talking about bind 

```js 

import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;

- If we call `this.increment`, the `increment` function will be invoked because it is defined within the class. However, if we call `increment` without binding it to `this`, the context of `this` inside the `increment` function will be `undefined`. This will lead to an error when we try to execute `this.setState({ count: this.state.count + 1 })` because `this` is `undefined`, resulting in an attempt to access `undefined.setState`, which will throw an error.
```

- So solution for this problem is binding

```js
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };

    // Bind the increment method to the component instance
    this.increment = this.increment.bind(this);

    !important // In this context, using a variable like `increment` directly, without `this`, would result in it being treated as a local variable within the constructor. This would make it inaccessible in other parts of the component, such as the `render` function.

    !important 
   // In JavaScript classes, using this is essential for defining properties and methods that need to be accessible throughout the class instance. Without this, variables are treated as local to the scope in which they are defined. Therefore, for properties or methods that need to be accessible in the class methods, you should always use this.propertyName.
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;


```

# This keyword for async and await 

* Normal function
```js

const obj = {
  value:42,
  regularMethod: function () {
    setTimeout( function () {
       console.log("Regular method's this:" this.value)
    },1000)
  }
}

obj.regularMethod(); // output is undefined as in window value is not present
```
- All the callbacks are executed wrt to the global scope.(Think in terms of closures)

* Arrow function

```js

const temp = {
    value: 22,
    fun: function () {
        setTimeout(() => {
            console.log("My value will be: " + this.value);
        }, 1000);
    }
};
temp.fun(); // output will be 22 because here this is bind to temp and will form closure with it.
```

- At the time of creation only it will bind 'this' to the object so 'this' will then point to temp.


# Conclusion Example

```js
const obj1 = {
  a:1,
  print: function () {
    function innerPrint() {
      console.log('a > ',this.a)
    }
    innerPrint();
  }
}

obj2.print(); // output will be undefined because dekho ki innerPrint ko kaun call kr rha hai kya koi object associated hai innerPrint se and function bhi normal hai to this will point to window.

```

```js
const obj1 = {
  a:1,
  print: function () {
    let innerPrint = () => {
      console.log('a > ',this.a)
    }
    innerPrint();
  }
}

obj2.print(); // output will be 1 because here we are using the arrow function and arrow function bind ho jata hai at the time of creation only. And bind bhi sbse top level se hi hota hai to here 'this' will bind to obj1 and we will get the output as 1.

```

![this concept](/assets/this.png "this concept")