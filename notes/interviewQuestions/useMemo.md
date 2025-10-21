# 📘 React Hook: useMemo

## 🧠 What is useMemo?
`useMemo` is a React Hook that **memoizes (caches)** the result of an **expensive computation** — so React doesn’t have to **recalculate** it on every render.

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
- The function inside runs only when dependencies in the array change.
- It helps improve performance by skipping unnecessary recalculations.

---

## ⚡ Example — Without and With useMemo

### ❌ Without useMemo
```jsx
function ExpensiveComponent({ numbers }) {
  const [count, setCount] = useState(0);

  const total = numbers.reduce((a, b) => a + b, 0); // heavy calc
  console.log("Calculating total...");

  return (
    <div>
      <p>Total: {total}</p>
      <button onClick={() => setCount(count + 1)}>Click {count}</button>
    </div>
  );
}
```

Even when only `count` changes, `reduce()` runs again — unnecessary work.

---

### ✅ With useMemo
```jsx
function ExpensiveComponent({ numbers }) {
  const [count, setCount] = useState(0);

  const total = useMemo(() => {
    console.log("Calculating total...");
    return numbers.reduce((a, b) => a + b, 0);
  }, [numbers]);

  return (
    <div>
      <p>Total: {total}</p>
      <button onClick={() => setCount(count + 1)}>Click {count}</button>
    </div>
  );
}
```

Now `total` is recalculated **only when `numbers` changes**.

---

## 💎 When to Use useMemo
Use it **only when**:
1. You perform **heavy computations** (sorting, filtering, loops, etc.).
2. You want to **avoid recalculating derived data** every render.
3. You want to **preserve reference equality** for objects/arrays passed to children.
4. You have **expensive derived values** that depend on props or state.

---

## 🧩 Example: Preventing Child Re-Renders
```jsx
const filteredUsers = useMemo(() => {
  return users.filter(u => u.isActive);
}, [users]);

<ChildComponent data={filteredUsers} />
```
Without `useMemo`, the `filteredUsers` array is **recreated each render**,  
causing `ChildComponent` to **re-render unnecessarily**.

---

## ⚠️ Drawbacks / Pitfalls

| Drawback | Explanation |
|-----------|--------------|
| 🧮 Overhead Cost | `useMemo` itself takes memory and CPU — avoid using for simple values. |
| 🧩 Wrong Dependencies | Missing or extra dependencies can lead to **stale or redundant recomputation**. |
| 🧠 Premature Optimization | Use only after identifying real performance issues. |
| 🔁 Not a Fix for Re-renders | Prevents recomputation, **not** component re-rendering — use `React.memo()` for that. |

---

## 🔄 useMemo vs useCallback

| Hook | Returns | Use Case |
|------|----------|----------|
| `useMemo` | Memoized **value** | Skip recalculating expensive values |
| `useCallback` | Memoized **function** | Skip recreating functions passed to children |

---

## ✅ Best Practices
- Use it only for **expensive operations**.
- Keep dependency arrays accurate and minimal.
- Combine with `React.memo()` when memoizing child props.
- **Profile first** (React DevTools → Profiler tab) before optimization.

---

## 🧾 Example Summary
```jsx
const filteredList = useMemo(() => {
  return list.filter(item => item.active);
}, [list]);
```
✔️ Efficient — recomputes only when `list` changes.  
❌ Don’t use for simple or constant expressions.

---

## 🧠 Key Takeaways
- `useMemo` = **cache computed values**
- Helps with **performance optimization**
- Avoid **overuse** — only for **heavy logic or large data sets**
