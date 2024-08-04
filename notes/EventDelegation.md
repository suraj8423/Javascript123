# Event Delegation in JavaScript

- Event Delegation is a technique in JavaScript that allows you to add a single event listener to a parent element that will handle events for multiple child elements, even if they are added dynamically. This is made possible by event propagation (bubbling), where events triggered on child elements propagate up to their parent elements.

* How Event Delegation Works

- Event Listener on Parent: Attach an event listener to a parent element instead of multiple child elements.
- Event Propagation: When an event occurs on a child element, it bubbles up to the parent element.
- Event Targeting: Use the event.target property to determine which child element triggered the event.

* Benefits of Event Delegation

- Efficiency: Reduces the number of event listeners, leading to better performance, especially with many child elements.
- Dynamic Elements: Handles events for dynamically added elements without needing to reattach event listeners.

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Event Delegation Example</title>
</head>
<body>
  <ul id="itemList">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>

  <button id="addItem">Add Item</button>

  <script src="script.js"></script>
</body>
</html>

```

```js
// Parent element (ul)
const itemList = document.getElementById('itemList');

// Event listener for the parent element
itemList.addEventListener('click', function(event) {
  if (event.target && event.target.nodeName === 'LI') {
    console.log('List item clicked:', event.target.textContent);
  }
});

// Dynamically add new items
const addItemButton = document.getElementById('addItem');
let itemCount = 3;

addItemButton.addEventListener('click', function() {
  itemCount++;
  const newItem = document.createElement('li');
  newItem.textContent = 'Item ' + itemCount;
  itemList.appendChild(newItem);
});

```