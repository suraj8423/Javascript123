# ⚛️ Props vs State in React

## 🧠 What Are Props and State?

In React, both **props** and **state** are used to store data and control how components behave or render.  
However, they serve **different purposes**.

---

## 🧩 1. Props (Properties)

**Definition:**  
Props are **read-only data** passed **from parent to child components**.  
They make components **reusable and dynamic**.

### Example
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return <Welcome name="Suraj" />;
}
```
➡️ `App` passes `name="Suraj"` to `Welcome` as a prop.  
Props are **immutable** — `Welcome` cannot change `props.name`.

### 🔒 Key Features of Props

| Property | Description |
|-----------|-------------|
| Source | Passed **from parent to child** |
| Mutability | **Immutable** (cannot be changed inside child) |
| Usage | For **configuration** and **data passing** |
| Access | Via `props` object |
| Example | `<UserCard name="Suraj" age={25} />` |

🧠 **Analogy:** Props are like **function arguments** — passed in, not modified.

---

## ⚙️ 2. State

**Definition:**  
State is **mutable data** that belongs to a **component**.  
When state changes, React **re-renders the component automatically**.

### Example
```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  );
}
```

➡️ `useState(0)` initializes a `count` variable.  
When `setCount` updates it, React **re-renders** the component.

### 🔑 Key Features of State

| Property | Description |
|-----------|-------------|
| Source | **Owned by the component** |
| Mutability | **Mutable** (can be updated using `setState` or `useState`) |
| Usage | For **data that changes over time** |
| Access | Via `this.state` (class) or `[state, setState]` (hooks) |
| Example | `const [isOpen, setIsOpen] = useState(false)` |

🧠 **Analogy:** State is like a **component’s memory** — it remembers data between renders.

---

## ⚖️ Props vs State — Key Differences

| Feature | Props | State |
|----------|-------|-------|
| **Definition** | Data passed from **parent to child** | Data **managed by the component itself** |
| **Mutability** | **Immutable** | **Mutable** |
| **Owner** | Controlled by **parent** | Controlled by **component** |
| **Update Mechanism** | Parent updates props | Component updates its own state |
| **Purpose** | To **customize** a component | To **track changes** inside a component |
| **Re-render Trigger** | When parent changes props | When `setState` or `useState` updates value |
| **Accessibility** | Read-only in child | Can be changed inside the component |
| **Analogy** | Function parameters | Local variables |

---

## ⚡ Example Showing Both

```jsx
function Child({ name }) { // 'name' = prop
  const [count, setCount] = useState(0); // 'count' = state

  return (
    <div>
      <h2>Hello, {name}</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

function App() {
  return <Child name="Suraj" />;
}
```
✅ `name` is a **prop** → comes from parent (`App`)  
✅ `count` is a **state** → internal to `Child` component

---

## 🧾 Summary

| Concept | Description | Mutable? | Source | Used For |
|----------|-------------|-----------|----------|-----------|
| **Props** | External data passed to component | ❌ No | Parent component | Configuration |
| **State** | Internal data within component | ✅ Yes | Component itself | Dynamic behavior |

---

## 💬 In Short

> **Props** = external & read-only  
> **State** = internal & changeable  

---

## 🧩 React Data Flow Diagram (Conceptual)

```
Parent Component --(props)--> Child Component
Child Component --(state changes)--> UI Re-render
```
