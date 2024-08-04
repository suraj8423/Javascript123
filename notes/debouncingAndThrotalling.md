# This keyword : Debouncing and Throtalling

- Both are used for optimisaing the performance of the web app and that can be achieved by limiting the rate of function call.

*  --------------   Debouncing   -------------------------

- We can take the example of search bar where we are writing something and it is giving some suggestions also, so on every key press we cannot call suggestion api otherwise millions of call with happen and it will reduce the performance so for that we use Debouncing.

```js

const getData = () => {
  console.log("fetchingData");
};

const handleKeyUp = (fn, time) => {
  let timer;
  return function () {
    const context = this;
    const agr = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      getData.apply(context, agr);
    }, time);
  };
};

const betterFunction = handleKeyUp(getData, 600);

```


* --------------- Throtalling ---------------

- In debouncing function gets call after delay in two keyPress but in throtalling functions gets called after fix time interval.

```js

const getData = () => {
  console.log('Throtalling is called');
}


handleThrotalling = (fun, timeInterval) => {
   let flag = true;
   return (
      function () {
        if(flag) {
          fun();
          flag= false;
          setTimeout(() => {
            flag= true
          },timeInterval)
        }
      }
   )
}

const betterFunctionForThrottling = handleThrotalling(getData,1000);

window.addEvent
```