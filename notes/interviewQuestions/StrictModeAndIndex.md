# ⚛️ Strict Mode and Keys in React

## 🧩 1. What is Strict Mode in React?

### ✅ Definition:
`React.StrictMode` is a **development-only** feature that helps you identify potential problems in your React code.  
It **does not render anything in the UI** and **does not affect production builds**.

---

### 🔍 Purpose:
Strict Mode helps in identifying:
- Unsafe or deprecated lifecycle methods (`componentWillMount`, etc.)
- Usage of outdated React APIs.
- Side effects inside components.
- Accidental state or prop mutations.
- Components with unexpected behavior during re-renders.

---

### 🧠 Example:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

In the above example, React runs extra checks on `<App />` and all its children to catch issues early.

---

### ⚙️ How Strict Mode Works:
- Invokes certain lifecycle methods and hooks **twice in development** to detect side effects.
- Warns if deprecated or unsafe React features are used.
- Highlights potential **memory leaks** or **unintended re-renders**.

🟡 **Note:** Strict Mode is **only active in development** and has **no runtime cost** in production.

---

## 🔑 2. What are Keys in React?

### ✅ Definition:
**Keys** are unique identifiers that React uses to efficiently manage and update lists of elements.  
They help React **track which items have changed, been added, or removed** during re-rendering.

---

### 🧠 Example:

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.task}</li>
      ))}
    </ul>
  );
}
```

Here, `key={todo.id}` gives each `<li>` a unique identity.

---

### ⚙️ Why Keys Are Important:
- Keys allow React to **optimize re-rendering** by reusing DOM elements.
- Without keys, React re-renders entire lists unnecessarily.
- Helps React differentiate between updated and unchanged list items.

---

### 🚫 Common Mistakes:

❌ Using **array index** as key (e.g., `key={index}`) when items can be reordered or deleted.  
✅ Use **unique and stable IDs** from your data.

---

### 🔎 Example (Wrong vs Right):

```jsx
// ❌ Wrong - index as key
{users.map((user, index) => (
  <UserCard key={index} user={user} />
))}

// ✅ Correct - unique id as key
{users.map((user) => (
  <UserCard key={user.id} user={user} />
))}
```

---

### 🧭 Summary Table:

| Concept | Description | Production Impact |
|----------|--------------|-------------------|
| **Strict Mode** | Detects potential issues in development | 🚫 No effect in production |
| **Keys** | Unique IDs to help React track list elements efficiently | ✅ Improves performance |

---

### 💡 Key Takeaways:
- Always wrap your root component with `React.StrictMode` during development.
- Always provide **unique keys** to list elements for predictable rendering.
- Avoid using **indexes as keys** unless your list is static and never changes.

---

**Author:** Suraj Tripathi  
**Topic:** React Core Concepts  
**Focus:** `Strict Mode` and `Keys`
