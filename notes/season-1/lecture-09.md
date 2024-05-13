# Episode 9 : Block Scope & Shadowing in JS

What is a **Block**?
* Block aka *compound statement* is used to group JS statements together into 1 group. We group them within {...}
    ```js
    {
        var a = 10;
        let b = 20;
        const c = 30;
        // Here let and const are hoisted in Block scope,
        // While, var is hoisted in Global scope.
    }
    ```

* Block Scope and its accessibility example
    ```js
    {
        var a = 10;
        let b = 20;
        const c = 30;
    }
    console.log(a); // 10
    console.log(b); // Uncaught ReferenceError: b is not defined
    ```
    * Reason?
        * In the BLOCK SCOPE; we get b and c inside it initialized as *undefined* as a part of hoisting (in a seperate memory space called **block**)
        * While, a is stored inside a GLOBAL scope. 

        * Thus we say, *let* and *const* are BLOCK SCOPED. They are stored in a separate mem space which is reserved for this block. Also, they can't be accessed outside this block. But var a can be accessed anywhere as it is in global scope. Thus, we can't access them outside the Block.

What is **Shadowing**?

* ```js
    var a = 100;
    {
        var a = 10; // same name as global var
        let b = 20;
        const c = 30;
        console.log(a); // 10
        console.log(b); // 20
        console.log(c); // 30 
    }
    console.log(a); // 10, instead of the 100 we were expecting. So block "a" modified val of global "a" as well. In console, only b and c are in block space. a initially is in global space(a = 100), and when a = 10 line is run, a is not created in block space, but replaces 100 with 10 in global space itself. 
    ```

* So, If one has same named variable outside the block, the variable inside the block *shadows* the outside variable. **This happens only for var**

* Let's observe the behaviour in case of let and const and understand it's reason.
    ```js
    let b = 100;
    {
        var a = 10;
        let b = 20;
        const c = 30;
        console.log(b); // 20
    }
    console.log(b); // 100, Both b's are in separate spaces (one in Block(20) and one in Script(another arbitrary mem space)(100)). Same is also true for *const* declarations.
    ```
    ![Block Scope Explaination](/assets/scope.jpg "Lexical Scope")


* Same logic is true even for **functions**
    ```js
    const c = 100;
    function x() {
        const c = 10;
        console.log(c); // 10
    }
    x();
    console.log(c); // 100
    ```

What is **Illegal Shadowing**?

* ```js
    let a = 20;
    {
        var a = 20;
    }
    // Uncaught SyntaxError: Identifier 'a' has already been declared
    ```
    * We cannot shadow let with var. But it is **valid** to shadow a let using a let. However, we can shadow var with let.
    * All scope rules that work in function are same in arrow functions too.
    * Since var is function scoped, it is not a problem with the code below.
        ```js
        let a = 20;
        function x() {
            var a = 20;
        }
        ```




<hr>

Watch Live On Youtube below:

<a href="https://www.youtube.com/watch?v=lW_erSjyMeM&ab_channel=AkshaySaini" target="_blank"><img src="https://img.youtube.com/vi/lW_erSjyMeM/0.jpg" width="750"
alt="Block Scope & Shadowing in JS Youtube Link"/></a>



* Additional Points in Block : 
* So the question is what is the need to combine all these javascript code into groups?
* Answer is we use to group the multiple javascript statements in block so that we can use them where javascript is expexting one statement.

* Definition for Block scope : What are the different variables and function we can access inside this block.

* If we already have var what is the use of let and const : This we could understand by one example 

 ```js
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(this.i);
    console.log(i);
  }, 1000);
}
console.log("var");
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(this.i);
    console.log(i);
  }, 1000);
}
```
Loop with var:

Iteration 1: i is declared and initialized to 0. The setTimeout function is called, but it doesn't execute immediately; it's scheduled to execute after 1000 milliseconds. i is captured by the setTimeout callback function.

Iteration 2: i is incremented to 1. Another setTimeout function is called, capturing the updated value of i (1).

Iteration 3: i is incremented to 2. Another setTimeout function is called, capturing the updated value of i (2).

After 1000 milliseconds, all three setTimeout callbacks execute, each logging the value of i, which is now 3.
So, the output will be 3 printed three times.

Loop with let:

Iteration 1: i is block-scoped to the loop body and initialized to 0. The setTimeout function is called, capturing the value of i (0).

Iteration 2: A new block-scoped i is created and initialized to 1. Another setTimeout function is called, capturing this new value of i (1).

Iteration 3: Another new block-scoped i is created and initialized to 2. Another setTimeout function is called, capturing this new value of i (2).

After 1000 milliseconds, each setTimeout callback executes, logging the value of i captured at the time of its creation.
So, the output will be 0, 1, and 2 each printed once.

In summary, with var, there's only one variable i shared across all iterations, which leads to the final value of i being captured by all setTimeout callbacks. With let, each iteration of the loop gets its own block-scoped i, preserving the expected value for each setTimeout callback.