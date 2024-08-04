# Event Bubbling and Capturing or Tricalling

* Event Propagation
- When an event occurs on an element, it can propagate through the DOM in two main phases:

* Event Capturing (Trickling):

* This is the first phase where the event starts from the window object and propagates down to the target element.
Event listeners added during this phase will be triggered before any listeners in the bubbling phase.
You can add an event listener in the capturing phase by passing true as the third argument to addEventListener.
Event Bubbling:

* This is the second phase where the event starts from the target element and bubbles up to the window object.
Event listeners added during this phase will be triggered after the capturing phase.
By default, event listeners are added in the bubbling phase.

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Event Propagation Example</title>
  <style>
    div { padding: 20px; margin: 10px; border: 1px solid black; }
  </style>
</head>
<body>
  <div id="outer">
    Outer Div
    <div id="inner">
      Inner Div
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>

```

```js
document.getElementById('outer').addEventListener('click', function(event) {
  console.log('Outer Div Clicked - Bubbling Phase');
});

document.getElementById('inner').addEventListener('click', function(event) {
  console.log('Inner Div Clicked - Bubbling Phase');
});

document.getElementById('outer').addEventListener('click', function(event) {
  console.log('Outer Div Clicked - Capturing Phase');
}, true);

document.getElementById('inner').addEventListener('click', function(event) {
  console.log('Inner Div Clicked - Capturing Phase');
}, true);

```
- We can stop this event propogation by using e.stopPropagation() to the target element.

```js
document.getElementById('inner').addEventListener('click', function(event) {
  console.log('Inner Div Clicked - Bubbling Phase');
  event.stopPropagation(); // Stops the event from bubbling up to outer div
});
```
* So the event propogation will still work but the point it will see the e.stopPropogation() propagation will stop there only.

* Point to remember is Capturing works from Top ----> Bottom and Bubbling works from Bottom to Top.