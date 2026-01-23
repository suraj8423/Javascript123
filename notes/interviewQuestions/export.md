# 📦 Export Default vs Named Export in JavaScript (and React)

Understanding the difference between `export default` and named `export` is key for writing modular, reusable code.

---

## 🧩 1. Types of Exports

| Type | Syntax | Import Syntax |
|------|---------|---------------|
| **Default Export** | `export default MyComponent;` | `import MyComponent from './MyComponent';` |
| **Named Export** | `export const MyComponent = ...;` | `import { MyComponent } from './MyComponent';` |

---

## ⚙️ 2. Default Export

- Each file can have **only one default export**.  
- You can **import it with any name**.

**Example:**

```js
// mathUtils.js
export default function add(a, b) {
  return a + b;
}

// app.js
import sum from './mathUtils';
console.log(sum(2, 3)); // 5
```

✅ Import name can be anything.

---

## ⚙️ 3. Named Export

- You can export **multiple items** from one file.  
- Must use **curly braces `{}`** and exact names during import.

**Example:**

```js
// mathUtils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// app.js
import { add, subtract } from './mathUtils';
```

❌ `import add from './mathUtils'` → will not work.

---

## 🧱 4. Mixing Both

You can combine both types:

```js
export default function multiply(a, b) {
  return a * b;
}

export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
```

Importing:

```js
import multiply, { add, subtract } from './mathUtils';
```

---

## ⚖️ 5. When to Use Which

| Use Case | Recommended Export |
|-----------|--------------------|
| Only one main export (React component, main function) | `export default` |
| Multiple exports (utilities, constants) | Named export |
| Tree-shaking optimization | Named export |
| Need flexible import name | Default export |

---

## ⚡ 6. React Example

```js
// Header.js
export default function Header() {
  return <h1>Hello World</h1>;
}

// Footer.js
export function Footer() {
  return <footer>© 2025 Suraj</footer>;
}

// App.js
import Header from './Header';
import { Footer } from './Footer';
```

---

## 🏁 Summary

| Feature | `export default` | Named `export` |
|----------|------------------|----------------|
| Exports allowed | Only **one** | **Multiple** |
| Import syntax | `import Anything from './file'` | `import { Something } from './file'` |
| Rename freely | ✅ Yes | ⚠️ Use `as` |
| Curly braces | ❌ No | ✅ Yes |
| Common usage | React components, single module | Utility modules |

---

**Author:** Suraj Tripathi  
**Topic:** JavaScript Module Exports  
**Last Updated:** November 2025  
