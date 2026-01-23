# 🚀 React Router Flow: Router → Routes → Route → Component

This guide explains how routing works behind the scenes in **React Router v6**, along with visual diagrams and key concepts.

---

## 🧩 Overview

React Router’s flow can be visualized like this:

```
BrowserRouter (Router)   <-- provides Router context (location, navigation methods)
    │
    └─> Routes (useRoutes under the hood)
            │
            ├─> Route path="/" element={<Home/>}
            ├─> Route path="/about" element={<About/>}
            └─> Route path="/users/*" element={<Users/>}
                      └─> (inside Users) Outlet -> nested <Route>s render here
```

---

## ⚙️ Step-by-Step Explanation

### 1. **BrowserRouter (or Router)**
- Acts as the **root provider** for routing context.
- Tracks the **current URL**, **navigation history**, and **location**.
- Listens to browser history changes (`popstate`) and updates context accordingly.
- Provides navigation methods like `push`, `replace`, and `goBack`.

---

### 2. **Routes**
- Reads the current `location` from the Router’s context.
- Uses the internal hook `useRoutes()` to **match** all `<Route>` definitions.
- Picks the **best matching route** based on the current URL.
- Renders the matched `<Route>`’s `element`.

---

### 3. **Route**
- A `<Route>` is a configuration describing:
  ```jsx
  <Route path="/about" element={<About />} />
  ```
- Defines which **component** should render for a particular **path**.
- Supports **nested routes** (child `<Route>`s rendered inside parent via `<Outlet />`).

---

### 4. **Component Rendering**
Once the route matches:
- React Router mounts the component defined in the `element` prop.
- For nested routes, the parent component renders `<Outlet />` as a placeholder for the child route.

Example:
```jsx
<Route path="/users" element={<Users />}>
  <Route path=":id" element={<UserProfile />} />
</Route>
```

When URL is `/users/42`:
→ Router renders `Users` (parent)  
→ Inside `Users`, the `<Outlet />` renders `UserProfile`.

---

## 🔄 How Navigation Works

1. User clicks a `<Link to="/about" />` or calls `navigate("/about")`.
2. The Router updates the browser’s history and changes the `location`.
3. The context value for `location` changes → `Routes` recalculates matches.
4. The new matching `<Route>`’s `element` renders.
5. Old route component unmounts automatically.

---

## 🧭 Example Structure

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Users from './Users';
import UserProfile from './UserProfile';
import Layout from './Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="users" element={<Users />}>
            <Route path=":id" element={<UserProfile />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
```

---

## 🧩 `<Outlet />` in Nested Routes

- `<Outlet />` is a placeholder for **child routes**.
- Parent route renders its UI, and `<Outlet />` inserts the child component.

Example:
```jsx
function Users() {
  return (
    <div>
      <h2>Users List</h2>
      <Outlet />  {/* Child routes render here */}
    </div>
  );
}
```

---

## ⚠️ Common Errors and Fixes

| Scenario | Error | Fix |
|-----------|--------|-----|
| Using `<Route>` without `<Routes>` | ❌ `Route must be inside a Routes component` | ✅ Wrap routes inside `<Routes>` |
| Using `<Routes>` without `<Router>` | ❌ `useRoutes() may be used only in the context of a <Router>` | ✅ Wrap `<Routes>` in `<BrowserRouter>` |
| Using `component` prop (v5 syntax) | ❌ Invalid prop in v6 | ✅ Use `element={<Component />}` |
| Not using `<Outlet />` for nested routes | ❌ Child routes won’t render | ✅ Add `<Outlet />` in parent component |

---

## 🧱 Router Types

| Router Type | Description | Use Case |
|--------------|-------------|----------|
| **BrowserRouter** | Uses HTML5 history API | Standard web apps |
| **HashRouter** | Uses hash in URL (`#/page`) | Static file servers (e.g. GitHub Pages) |
| **MemoryRouter** | Stores routes in memory | Tests, React Native apps |

---

## 🏁 Summary

| Concept | Role |
|----------|------|
| **Router** | Provides routing context (location, history) |
| **Routes** | Matches URL → finds right `<Route>` |
| **Route** | Defines path and renders matching component |
| **Outlet** | Displays child routes in nested setups |
| **Link / navigate()** | Changes the route and triggers re-render |

---

## ✅ Quick Takeaways

- Always wrap your routes inside **`<Router>` → `<Routes>` → `<Route>`**.
- Use `element={<Component />}` (not `component={}`).
- Use `<Outlet />` for nesting.
- You no longer need `exact` — v6 matches most specific path automatically.
- `Routes` replaced `Switch` from older versions.

---

## 📊 Flow Summary Diagram

```
URL Change (User clicks link / navigate())
        ↓
BrowserRouter updates location context
        ↓
<Routes> re-evaluates matching paths
        ↓
<Route> with matching path found
        ↓
Render its element (Component)
        ↓
If nested → <Outlet /> renders child route
```

---

### 🧠 Pro Tip:
You can think of React Router like a **state machine** —  
the `location` (URL) is the state,  
and the matched `<Route>` tree is the UI that represents that state.

---

**Author:** Suraj Tripathi  
**Topic:** React Router v6 Internal Flow  
**Last Updated:** November 2025  
