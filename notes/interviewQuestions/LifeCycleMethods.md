# Life cycle Methods

## 🌱 React Component Lifecycle

- Every React component goes through a lifecycle of three main phases:

- Mounting → Component is created and inserted into the DOM.

- Updating → Component re-renders when state/props change.

- Unmounting → Component is removed from the DOM.

## 🏗️ Class Component Lifecycle

- Here’s the detailed flow:

### 1. Mounting Phase (first render)

#### constructor(props)
- 👉 Runs once when the component is initialized.
- 👉 Use for:

- Setting initial state

- Binding event handlers

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log("Constructor");
  }
}
```

#### static getDerivedStateFromProps(props, state)
- 👉 Rarely used. Syncs state with props before every render (both mount & update).
- 👉 Avoid unless absolutely necessary.

```js
static getDerivedStateFromProps(nextProps, prevState) {
  if (nextProps.value !== prevState.value) {
    return { value: nextProps.value };
  }
  return null; // no state change
}
```

#### render()
- 👉 Returns JSX → pure function (no side effects).
- 👉 Runs during mount & update.

#### componentDidMount()
- 👉 Runs once after initial render, DOM available.
- 👉 Use for:

-  API calls

- Subscriptions

- Setting timers
```js
componentDidMount() {
  console.log("Mounted!");
  fetch("/api/data").then(res => res.json()).then(data => this.setState({ data }));
}

```

### Updating Phase (when props/state changes)

#### static getDerivedStateFromProps()
- 👉 Runs again if props change.
#### render()
- 👉 Runs again to update UI.

#### componentDidUpdate(prevProps, prevState, snapshot)
- 👉 Runs after update.
- 👉 Use for:

- Reacting to prop/state change (e.g., API call if prop changed)

- Performing DOM operations (with snapshot if needed).

```js
componentDidUpdate(prevProps, prevState, snapshot) {
  if (snapshot !== null) {
    this.listEnd.scrollTop = this.listEnd.scrollHeight - snapshot;
  }
}

```

### Unmounting Phase

#### componentWillUnmount()
- 👉 Cleanup before component is destroyed.
- 👉 Use for:

- Clearing timers

- Removing event listeners

- Canceling network requests

```js
componentWillUnmount() {
  clearInterval(this.timer);
  console.log("Component unmounted");
}

```

## ⚡ Functional Component Lifecycle (with Hooks)

- React Hooks (introduced in React 16.8) let us handle lifecycle in functional components.

- Mounting → useEffect(() => { ... }, [])

- Updating → useEffect(() => { ... }, [dependencies])

- Unmounting → Cleanup inside effect

- Example:

```js
import React, { useState, useEffect } from "react";

function MyComponent({ value }) {
  const [count, setCount] = useState(0);

  // componentDidMount + componentDidUpdate (depends on value)
  useEffect(() => {
    console.log("Value changed:", value);
    return () => {
      // cleanup = componentWillUnmount
      console.log("Cleanup before value changes/unmount");
    };
  }, [value]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

```