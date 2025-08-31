# DOM and Virtual DOM in react

## The DOM (Document Object Model)

- The DOM is the browser’s tree-like representation of your HTML page.

- Every element (<div>, <h1>, <button>) is a node in this tree.

- Example DOM for:

```js
<div id="root">
  <h1>Hello</h1>
  <button>Click</button>
</div>

```
- Browser sees this as a tree:
```js
<div id="root">
  <h1>Hello</h1>
  <button>Click</button>
</div>

```

### ⚡ Problem with real DOM:
- Updating it is slow because:

- A small change requires re-rendering the entire subtree.

- Each change can trigger recalculations (reflow, repaint).

- For large apps, this is very costly.

## What is Virtual DOM (VDOM)?

- React’s solution: Create a lightweight copy of the real DOM in memory.

- Instead of touching the browser DOM directly, React:

- Keeps a virtual representation of the UI (a JS object).

- Updates that object when your app state/props change.

- Efficiently compares the new VDOM with the old VDOM (diffing).

- Applies only the minimal changes to the real DOM.

```js
function App() {
  return (
    <div>
      <h1>Hello</h1>
      <button>Click</button>
    </div>
  );
}

```

- React doesn’t create real DOM nodes first. Instead, it creates plain JS objects like:
```js
{
  type: "div",
  props: {
    children: [
      { type: "h1", props: { children: "Hello" } },
      { type: "button", props: { children: "Click" } }
    ]
  }
}

This is the Virtual DOM tree.
```

## Why Virtual DOM is Lightweight?

- Real DOM nodes are heavy objects managed by the browser (with tons of properties, event listeners, layout info).

- Virtual DOM nodes are just plain JS objects (lightweight, cheap to create and compare).

- So, React can do thousands of operations on VDOM quickly in memory.

- Think of it like:

- Real DOM = expensive to update (like reprinting a whole newspaper for one typo).

- Virtual DOM = editing a draft on Google Docs (fast changes in memory before printing).

## How React Updates the DOM Efficiently?

- React follows Reconciliation Process:

- Render Phase → Build new Virtual DOM tree when state/props change.

- Diffing Algorithm → Compare new VDOM vs old VDOM.

- If the element type & key are same → reuse.

- If not → destroy and recreate.

- For lists, React uses keys to minimize DOM operations.

- Commit Phase → Apply minimal changes to the real DOM.

- Example:

- Old VDOM:

```js
<ul>
  <li>A</li>
  <li>B</li>
</ul>

```

- New VDOM:
```js
<ul>
  <li>A</li>
  <li>C</li>
</ul>

```

- ➡ React sees only B → C changed → updates just that node, instead of re-rendering whole <ul>.

## Why React feels Fast

- Batching updates → Multiple state changes in one go → fewer DOM writes.

- VDOM diffing → Only minimal updates to real DOM.

- Asynchronous rendering (Fiber) → React can pause rendering to keep UI smooth.

- Event delegation → React attaches fewer real DOM listeners.

## Visualization
```js
App State Change
      ↓
New Virtual DOM (JS Object)
      ↓
Compare with Old Virtual DOM (Diffing)
      ↓
Minimal Patch applied to Real DOM

```

# can you explain me with one example that when real dom is created and when virtual dom and created and how we update the real dom?

## Example: A simple counter
```js
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;

```
### Step 1: Initial Render
- What happens when the app first loads?

- Virtual DOM Creation

- React builds a Virtual DOM tree (plain JS objects):
```js
{
  type: "div",
  props: {
    children: [
      { type: "h1", props: { children: "Count: 0" } },
      { type: "button", props: { children: "Increment" } }
    ]
  }
}

```

- Real DOM Creation

- React converts this Virtual DOM into real DOM nodes and mounts them into the browser’s DOM:

```js
<div>
  <h1>Count: 0</h1>
  <button>Increment</button>
</div>

```

- So, at first render:

- Virtual DOM = created in memory (JS object).

- Real DOM = created from that Virtual DOM and attached to browser.

### Step 2: State Update (Click Button)

- When user clicks Increment:

#### setCount triggers re-render → React calls Counter() again → creates a new Virtual DOM:

```js
{
  type: "div",
  props: {
    children: [
      { type: "h1", props: { children: "Count: 1" } }, // 👈 updated
      { type: "button", props: { children: "Increment" } }
    ]
  }
}

```

#### Diffing (VDOM Comparison)

- React compares new Virtual DOM with old Virtual DOM.

- It sees that:

- <div> is the same.

- <h1> text changed: "Count: 0" → "Count: 1".

- <button> is unchanged.

- Real DOM Update

- React updates only the changed node in the real DOM (<h1> text).

- Final Real DOM becomes:
```js
<div>
  <h1>Count: 1</h1>   <!-- Only this part changed -->
  <button>Increment</button>
</div>

```

### Step 3: Future Updates

- Every time setCount runs:

- New Virtual DOM is created (lightweight).

- React diffs with previous Virtual DOM.

- Only minimal changes are patched into Real DOM.

# can you take the same example and campare how it will be a heavy operation if we do not have the concept of virtual dom

```js
function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

```

## How React works WITH Virtual DOM

- When you click the button:

- React creates a new Virtual DOM tree in memory.

- It diffs new VDOM with the old VDOM.

- Finds only one change:
- "Count: 0" → "Count: 1".

- React updates only that <h1> node in the real DOM. ✅

- So the browser only executes:
```js
document.querySelector("h1").textContent = "Count: 1";

```

- 👉 Result:

- Very cheap.

- DOM manipulation is minimal.

## How it would work WITHOUT Virtual DOM

- Now, imagine React did not have VDOM.

- Every time setCount triggers, React would:

- Throw away the entire real DOM subtree of <div>...</div>.

- Rebuild new DOM nodes:
```js
<div>
  <h1>Count: 1</h1>
  <button>Increment</button>
</div>

```
- Replace the old subtree with the new one in the real DOM.

- That means:

- Old <h1> destroyed → new <h1> created.

- Old <button> destroyed → new <button> created.

- Event listeners (onClick) would also be re-attached.

- Even though only the number changed, the whole subtree gets recreated.

## Why this is Heavy

- The real DOM is expensive because:

- Creating/removing elements triggers reflow (recalculating layout).

- Updating styles triggers repaint (redrawing pixels).

- Attaching event listeners repeatedly adds extra cost.

- If you have 1000+ elements (like a table, list, dashboard), this becomes painfully slow.

- So in our Counter:

- Without VDOM: whole <div> is re-rendered every time.

- With VDOM: only the text node inside <h1> changes.

## Performance Visualization
- Without Virtual DOM
```js
Click Increment →
Destroy <div> subtree →
Rebuild entire <div>, <h1>, <button> →
Reattach button event listener →
Insert into DOM

```
- With Virtual DOM
```js
Click Increment →
Build new VDOM →
Diff old vs new VDOM →
Update only <h1>.textContent →
Done

```
### 5. Analogy

- Without VDOM = Every time you correct one word in a book, you reprint the entire book. 📚

- With VDOM = You just fix that one word with a pen. ✍️

# Can you explain me how this dom and virtual dom works with multiple components present in the react app? Also explain how after campairing old virtual dom and new virtual dom what we do with old virtual dom and new virtual dom?

## 1. DOM & Virtual DOM in a Multi-Component React App

- Say we have this app:
```js
function Header({ title }) {
  return <h1>{title}</h1>;
}

function Counter({ count, onIncrement }) {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={onIncrement}>Increment</button>
    </div>
  );
}

function App() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <Header title="My Counter App" />
      <Counter count={count} onIncrement={() => setCount(count + 1)} />
    </div>
  );
}

```
### Step 1: Initial Render

- React builds a Virtual DOM tree for the entire App:
```js
{
  type: "div",
  props: {
    children: [
      { type: "Header", props: { title: "My Counter App" } },
      { type: "Counter", props: { count: 0, onIncrement: f } }
    ]
  }
}

```
- React converts this Virtual DOM → Real DOM and mounts into the browser.
- Resulting Real DOM:
```js
<div>
  <h1>My Counter App</h1>
  <div>
    <p>Count: 0</p>
    <button>Increment</button>
  </div>
</div>

```

### Step 2: State Update (Click Increment)

- When button is clicked:

- setCount(1) → React re-renders App.

- A new Virtual DOM is created in memory.

- Now, new VDOM tree looks like:

```js
{
  type: "div",
  props: {
    children: [
      { type: "Header", props: { title: "My Counter App" } }, // same
      { type: "Counter", props: { count: 1, onIncrement: f } } // count changed
    ]
  }
}

```

## How React Decides What to Update

- React now compares:

- Old VDOM vs New VDOM component by component (this is reconciliation).

- Header: props.title is the same → skip re-rendering <h1>.

- Counter: props.count changed (0 → 1) → re-render only inside Counter.

- Inside Counter:

- Old: <p>Count: 0</p>

- New: <p>Count: 1</p>
- ➡ Only text node changes.

- <button> is unchanged (same props & key) → skipped.

## What Happens to Old & New Virtual DOM Trees

- This is a very good subtle point 👌

- React never keeps every old VDOM forever (that would blow up memory).

- Instead:

- Old VDOM is used for diffing (comparison).

- Once diffing is done, React throws away the old VDOM (garbage collected by JS engine).

- New VDOM becomes the current snapshot of the UI.

- On the next state change, React will again create a new VDOM and compare it with this latest one.

- So it’s like:
```js
Old VDOM (snapshot A)
↓ (diff)
New VDOM (snapshot B)
↓ (diff)
New VDOM (snapshot C)
...

```
- Each render creates a new blueprint (VDOM). The previous one is only needed for the diff step, then discarded.
## Multi-Component Optimization

- When there are multiple components:

- React does not re-render the whole app every time.

- It checks which component’s props or state changed and re-renders only those components → creates new VDOM for those parts.

- The rest of the tree reuses the old VDOM & real DOM.

- 👉 This is why React apps scale well: even if you have 1000 components, changing state in one small part doesn’t rebuild the entire DOM tree.

## Visualization
- Initial Render
```js
App
 ├── Header ("My Counter App")
 │     └── <h1>My Counter App</h1>
 └── Counter (count=0)
       ├── <p>Count: 0</p>
       └── <button>Increment</button>

```
- After Increment
```js
App
 ├── Header (no change) ✅ reused
 │     └── <h1>My Counter App</h1>
 └── Counter (count=1)
       ├── <p>Count: 1</p>  🔄 updated
       └── <button>Increment</button> ✅ reused

```

```js
function Header({ title })
 { return <h1>{title}</h1>; } 
function Counter({ count, onIncrement }) 
{ return ( <div> <p>Count: {count}</p> <button onClick={onIncrement}>Increment</button> </div> ); } 

function App()
 { console.log('hello world') const [count, setCount] = React.useState(0); return ( <div> <Header title="My Counter App" /> <Counter count={count} onIncrement={() => setCount(count + 1)} /> </div> ); }
  let say I have added the console log in App now why on each render this console.log will be printed?
```

## 🔹 Why console.log("hello world") runs on every render?
```js
function App() {
  console.log("hello world");
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <Header title="My Counter App" />
      <Counter count={count} onIncrement={() => setCount(count + 1)} />
    </div>
  );
}

```

- App is a function component.

- In React, function components are not “persistent objects” — they are literally functions that React calls to produce Virtual DOM.

- Each time App re-renders (because its state or props changed), React just calls the App function again.

- That means:

- On initial render → React calls App() → logs "hello world".

- When you click Increment → setCount(count + 1) triggers a re-render → React calls App() again → logs "hello world" again.

- This repeats for every render cycle.

## 🔹 Why React does this?

- Because in React:

- Render phase = calling your component functions to build a new Virtual DOM tree.

- React does not “patch” your functions — it re-executes them to compute the latest output (JSX).

- So console.log() is just part of your render logic → it will always run whenever React re-runs the component.

## 🔹 What stays the same across renders?

- You might wonder: “But doesn’t my state reset if React calls the function again?”

- 👉 That’s where React hooks (like useState) come in.

- React keeps an internal state store (Fiber tree).

- Even though App() is called again and again,

- React remembers the previous count value from its internal structure,

- and returns it when you call useState.

- So:

- Function body is re-executed each render (that’s why console.log runs).

- State is preserved separately by React.

## 🔹 Visual Flow

- First render:

- React calls App() → logs "hello world" → builds VDOM → mounts real DOM.

- Click Increment:

- setCount(1) tells React: "schedule a re-render".

- React calls App() again → logs "hello world" again → builds new VDOM.

- React diffs old vs new VDOM → only updates <p>Count: 1</p> in real DOM.

- Repeat for every state change.

## ✅ In summary:
- The console.log("hello world") runs every render because function components in React are re-executed on every render to calculate the new Virtual DOM. React doesn’t reuse the previous function execution — it just re-calls the component function with the latest state/props.