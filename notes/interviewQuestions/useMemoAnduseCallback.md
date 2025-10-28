# 🧠 useMemo vs useCallback in React

## 📘 Overview

Both `useMemo` and `useCallback` are React hooks used for **performance optimization**.  
They help prevent unnecessary re-renders or recomputations by **memoizing values or functions**.

---

## ⚖️ Core Difference

| Hook | Purpose | Returns | Use Case |
|------|----------|----------|-----------|
| `useMemo` | Memoizes the **result** of a function | Returns the **computed value** | When you want to avoid **recomputing an expensive value** |
| `useCallback` | Memoizes the **function itself** | Returns the **same function reference** | When you want to avoid **recreating a function** on every render |

---

## 🔍 1. useMemo – Memoizing Values

### ✅ What it does
`useMemo` caches the **return value** of a computation between renders.  
React only recomputes it when one of its dependencies changes.

### 💡 When to use
- When a **calculation is expensive** (e.g., sorting or filtering large data).
- When passing **computed data** to child components to prevent unnecessary re-renders.

### 💻 Example

```jsx
import React, { useMemo, useState } from "react";

function ExpensiveCalculationComponent({ items }) {
  const [count, setCount] = useState(0);

  const sortedItems = useMemo(() => {
    console.log("Sorting items...");
    return [...items].sort((a, b) => a.localeCompare(b));
  }, [items]);

  return (
    <div>
      <h3>Sorted Items:</h3>
      {sortedItems.join(", ")}
      <button onClick={() => setCount(count + 1)}>Clicked {count}</button>
    </div>
  );
}
```

👉 Without `useMemo`, sorting runs **on every render** (even when `count` changes).  
👉 With `useMemo`, sorting runs **only when `items` changes**.

---

## ⚙️ 2. useCallback – Memoizing Functions

### ✅ What it does
`useCallback` caches the **function reference**, so the same function instance is returned unless dependencies change.

### 💡 When to use
- When passing a **callback function** to a child component using `React.memo()`.
- To prevent **child re-renders** caused by new function references.

### 💻 Example

```jsx
import React, { useCallback, useState } from "react";
import ChildButton from "./ChildButton";

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Button clicked!");
  }, []); // Same function reference on every render

  return (
    <div>
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ChildButton onClick={handleClick} />
    </div>
  );
}

// Child component
const ChildButton = React.memo(({ onClick }) => {
  console.log("Child re-rendered");
  return <button onClick={onClick}>Click Me</button>;
});

export default Parent;
```

👉 Without `useCallback`, `handleClick` is **recreated** every render → child re-renders.  
👉 With `useCallback`, the child **stays stable**.

---

## 🔄 Summary: When to Use Which

| Situation | Hook to Use | Why |
|------------|-------------|-----|
| Avoid recalculating expensive values | `useMemo` | Caches **value** |
| Prevent unnecessary child re-renders caused by function props | `useCallback` | Caches **function reference** |
| Function result needs to be reused | `useMemo` | Returns computed result |
| Function itself needs to be reused | `useCallback` | Returns same function |

---

## ⚠️ Important Notes

1. Don’t overuse `useMemo` or `useCallback` — they add overhead.  
   Use them **only when performance issues are proven**.
2. Both hooks rely on the **dependency array**.  
   Incorrect dependencies → stale values or missed updates.
3. `useMemo(fn, deps)` is roughly equal to:
   ```jsx
   const memoizedValue = useCallback(() => fn(), deps)();
   ```
   → `useCallback` memoizes **the function**, while `useMemo` memoizes **the result**.

---

## 🧩 Real-life Analogy

| Concept | Example |
|----------|----------|
| `useMemo` | Like storing the **output** of a long calculation (so you don’t do it again). |
| `useCallback` | Like storing the **formula** itself (so you don’t rewrite it every time). |

---

## 🚀 Final Takeaway

- 🧮 Use `useMemo` → for **computed data**  
- ⚙️ Use `useCallback` → for **functions passed as props**
- 🧠 Both help React **skip unnecessary work**, improving performance in large or complex components.

---

**Author:** Suraj Tripathi  
**Topic:** React Performance Hooks – `useMemo` vs `useCallback`  
**File:** `useMemo_vs_useCallback_Notes.md`
