# 🍪 Cookie vs 💾 localStorage vs 🕒 sessionStorage

A complete comparison of browser storage mechanisms — their lifetimes, use-cases, and security considerations.

---

## 🧠 Overview

| Feature | **Cookies** | **localStorage** | **sessionStorage** |
|----------|--------------|------------------|--------------------|
| **Definition** | Small pieces of data stored in the browser and sent with every HTTP request | Persistent client-side storage | Temporary client-side storage (per tab) |
| **Storage Size** | ~4KB | ~5–10MB | ~5–10MB |
| **Accessible From** | Client + Server | Client only | Client only |
| **Lifetime** | Configurable (Expires or Max-Age) | Permanent until cleared manually | Until the browser tab is closed |
| **Auto Sent to Server** | ✅ Yes | ❌ No | ❌ No |
| **Security** | Can be `HttpOnly`, `Secure`, `SameSite` | Exposed to JS (XSS risk) | Exposed to JS (XSS risk) |
| **Scope** | Shared across all tabs of same domain | Shared across all tabs of same domain | Unique to each tab/window |

---

## 🧩 Detailed Explanation

### 🍪 1. Cookies

#### 🔹 Definition:
Cookies are small text files stored by the browser that are **automatically sent** with every HTTP request to the same domain.

#### 🔹 Setting a Cookie
```js
document.cookie = "username=Suraj; expires=Fri, 01 Nov 2025 12:00:00 UTC; path=/";
```

#### 🔹 Attributes
| Attribute | Description |
|------------|--------------|
| `expires` | Sets an absolute expiry date |
| `max-age` | Sets a relative lifetime (in seconds) |
| `path` | Defines the valid path for the cookie |
| `HttpOnly` | Inaccessible via JavaScript (prevents XSS) |
| `Secure` | Only sent over HTTPS |
| `SameSite` | Controls cross-site requests (prevents CSRF) |

#### 🔹 Cookie Lifetime Types
1. **Session Cookie** – No expiry → deleted when browser closes.  
2. **Persistent Cookie** – Has expiry → saved until expiry or manually deleted.  
3. **Max-Age Cookie** – Expires after specified seconds.

#### 🔹 Example
```js
document.cookie = "token=abcd123; max-age=3600; Secure; SameSite=Strict;";
```

---

### 💾 2. localStorage

#### 🔹 Definition:
`localStorage` is a **persistent key-value** storage in the browser, saved **indefinitely** until manually cleared.

#### 🔹 Example:
```js
localStorage.setItem("theme", "dark");
localStorage.getItem("theme"); // "dark"
localStorage.removeItem("theme");
```

#### 🔹 Lifetime:
- Data **persists even after closing the browser or rebooting the system**.
- Deleted only when:
  - The user clears browser storage.
  - The app removes it programmatically (`removeItem()` / `clear()`).

#### 🔹 Best For:
- Saving user preferences (theme, layout)
- Caching non-sensitive data
- Storing JWT tokens in SPAs (⚠️ XSS risk)

---

### 🕒 3. sessionStorage

#### 🔹 Definition:
`sessionStorage` stores data **only for one browser tab session**.

#### 🔹 Example:
```js
sessionStorage.setItem("otp", "9876");
sessionStorage.getItem("otp"); // "9876"
```

#### 🔹 Lifetime:
- Lives **until the tab or window is closed**.
- **Refreshing the page** keeps it intact.
- **Opening a new tab** gives a **new sessionStorage**.

#### 🔹 Best For:
- Temporary session data (OTP, form progress)
- Tab-specific information
- Step-based workflows

---

## 🕒 Storage Lifetimes Summary

| Storage Type | **Lifetime** | **Deleted When** | **Shared Between Tabs?** |
|---------------|---------------|------------------|--------------------------|
| **Cookies** | Custom (set via `expires` or `max-age`) | When expired or manually deleted | ✅ Yes |
| **localStorage** | Permanent | When cleared manually or programmatically | ✅ Yes |
| **sessionStorage** | Until tab/window closed | On tab close | ❌ No |

---

## ⚙️ Example: Lifetime in Action

```js
// Cookie (expires after 30 seconds)
document.cookie = "token=abc; max-age=30";

// localStorage (persistent)
localStorage.setItem("theme", "dark");

// sessionStorage (temporary)
sessionStorage.setItem("otp", "1234");
```

| Action | Cookie | localStorage | sessionStorage |
|---------|---------|--------------|----------------|
| Wait 30 seconds | ❌ Deleted | ✅ Stays | ✅ Stays |
| Close tab | ✅ Stays (if not session cookie) | ✅ Stays | ❌ Deleted |
| Close browser | Depends on expiry | ✅ Stays | ❌ Deleted |
| Clear browser storage | ❌ Deleted | ❌ Deleted | ❌ Deleted |

---

## 🔐 Security Considerations

| Threat | Affects | Notes |
|--------|----------|-------|
| **XSS (Cross-Site Scripting)** | localStorage, sessionStorage | Can steal sensitive data |
| **CSRF (Cross-Site Request Forgery)** | Cookies | Use `SameSite=Strict` and tokens |
| **Mitigation** | Cookies → Use `HttpOnly`, `Secure` flags<br>localStorage → Avoid storing sensitive info |

---

## 🧭 When to Use What

| Use Case | Recommended Storage |
|-----------|----------------------|
| Authentication (Server-managed) | `HttpOnly` Cookie |
| Authentication (Client-managed SPA) | `localStorage` (with caution) |
| Temporary form/session data | `sessionStorage` |
| Theme, user preferences, cache | `localStorage` |

---

## 🧮 Visual Summary

```
 ┌────────────────────┐
 │       COOKIE       │
 │--------------------│
 │ Size: ~4KB         │
 │ Sent to server ✅   │
 │ Configurable expiry │
 └────────────────────┘
          ▲
          │
 ┌────────────────────┐
 │   localStorage     │
 │--------------------│
 │ Size: ~10MB        │
 │ Client only ❌      │
 │ Persists forever   │
 └────────────────────┘
          ▲
          │
 ┌────────────────────┐
 │  sessionStorage    │
 │--------------------│
 │ Size: ~10MB        │
 │ Client only ❌      │
 │ Tab-based lifetime │
 └────────────────────┘
```

---

## ✅ Quick Revision Summary

| Feature | Cookie | localStorage | sessionStorage |
|----------|---------|--------------|----------------|
| Size | ~4KB | ~10MB | ~10MB |
| Scope | Domain | Domain | Tab |
| Lifetime | Configurable | Permanent | Tab lifetime |
| Sent with HTTP | ✅ | ❌ | ❌ |
| Accessible by JS | If not HttpOnly | ✅ | ✅ |
| Use Case | Auth, tracking | Caching, prefs | Temporary data |

---

**Author:** Suraj Tripathi  
**Created for:** Frontend + Fullstack Interview Prep  
**Last Updated:** 2025-10-28  
