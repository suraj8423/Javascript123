# Session-Based Authentication and Authorization

## How Authentication Works with Sessions
- User submits credentials (username/password) to the server.
- Server verifies credentials.
- If valid, server creates a session with a unique session ID.
- Session data (user ID, roles, permissions) is stored on the server.
- Server sends the session ID to the client as a cookie.
- Client includes the cookie in subsequent requests.
- Server retrieves session data using session ID to confirm user identity.

## How Authorization Works with Sessions
- Session contains user roles or access rights.
- Server checks permissions for each request against session data.
- Access granted or denied based on user roles and requested resource.
- Authorization happens on each request; authentication occurs once per session.

## Session Lifecycle
- Sessions have expiration times for security.
- Logging out destroys the session on the server and removes client cookie.

# Why HTTP Being Stateless Makes Sessions Necessary

- HTTP is stateless: each request is independent; the server forgets previous requests.
- Statelessness enhances simplicity, scalability, and reliability.
- Web applications need to remember logged-in users and other data across requests.
- Sessions provide “state” by storing user info server-side linked with a session ID.
- Session ID sent to client (usually in a cookie) and returned with each request.
- Server uses session to associate multiple requests with the same user.
- Without sessions, login, personalized experiences, and persistent data would be impossible.

# Why Servers Can't Rely on TCP Connections to Track User State

- TCP connections are temporary; they close once communication ends.
- Users may open multiple TCP connections concurrently.
- TCP connection identifiers (IP address and port) can change due to NAT, proxies, or mobile networks.
- TCP focuses on reliable data transport, not application-level state.
- Maintaining long-lived TCP connections for state is resource-intensive and not scalable.
- Sessions at the application level allow persistent user tracking beyond single TCP connections.

---

*This note summarizes key concepts of session-based authentication/authorization, the stateless nature of HTTP, and why session management is essential in web applications.*

# 🔐 Session-Based Authentication vs JWT Authentication (with Refresh Token)

---

## 🧩 1. What is Authentication vs Authorization

- **Authentication:** Verifies **who you are** (login process).
- **Authorization:** Determines **what you can access** after authentication.

Example:
> When you log in to Netflix — Authentication verifies your identity.  
> When you play a movie — Authorization checks if your plan allows HD streaming.

---

## 🗂️ 2. Session-Based Authentication (Stateful)

### ⚙️ How It Works
1. User logs in with credentials (username/password).
2. Server verifies them and creates a **session** on the server:
   ```json
   {
     "sessionId": "abc123",
     "userId": 101,
     "role": "admin",
     "expiresAt": "2025-10-22T20:00:00Z"
   }
   ```
3. Server sends **sessionId** to the client (via cookie).
4. On every subsequent request, the browser sends this cookie:
   ```
   Cookie: sessionId=abc123
   ```
5. Server looks up the sessionId in its store and validates it.
6. If valid → proceeds with the request.
7. If expired → user must log in again.

---

### ✅ Example Flow
```
POST /login
{
  "username": "suraj",
  "password": "mypassword"
}
```
➡ Server verifies → Creates session  
➡ Sends back cookie:
```
Set-Cookie: sessionId=abc123; HttpOnly; Secure
```

Now every request automatically includes:
```
GET /account
Cookie: sessionId=abc123
```

Server checks the session and returns data.

---

### 📊 Pros and Cons

| Pros | Cons |
|------|------|
| Easy to revoke sessions | Needs server-side storage |
| Can store large data on server | Hard to scale (needs shared store like Redis) |
| Simple to implement | Not ideal for microservices |

---

## 🔑 3. JWT-Based Authentication (Stateless)

### ⚙️ What is a JWT?
JWT (JSON Web Token) = a self-contained token with:
```
Header.Payload.Signature
```

Example payload:
```json
{
  "userId": 101,
  "role": "customer",
  "exp": 1692690900
}
```

The server signs this with a secret/private key.
No server storage is required — token itself contains all info.

---

### 🔄 How It Works

1. User logs in → Server verifies credentials.
2. Server generates a **JWT token** and returns it:
   ```
   Authorization: Bearer <JWT_TOKEN>
   ```
3. Client stores the token (usually in memory or cookie).
4. For every request:
   ```
   Authorization: Bearer <JWT_TOKEN>
   ```
5. Server verifies:
   - Signature (valid & not tampered)
   - Expiry (not expired)
   - Issuer & audience claims

If valid → grant access  
If expired → request new access token (via Refresh Token).

---

### 🧠 Key Differences

| Feature | Session-Based | JWT-Based |
|----------|----------------|------------|
| **Storage** | On server (DB/Redis) | On client (token) |
| **Scalability** | Difficult | Easy (stateless) |
| **Revocation** | Simple (delete session) | Harder (requires blacklist or short expiry) |
| **Speed** | Requires lookup | Faster (no lookup) |
| **Microservices** | Complex | Ideal |
| **Security** | Cookie/session-based | Token signature-based |

---

## 🔄 4. Refresh Token Flow (for JWT)

### ⚙️ Why We Need Refresh Tokens
Access tokens (JWTs) usually expire in 10–15 minutes.  
Refresh tokens help obtain new access tokens **without re-login**.

---

### 🧭 Flow Diagram

```
[ Login ]
   ↓
Access Token (10 min)
Refresh Token (7 days)
   ↓
[ API Request ] → uses Access Token
   ↓
[ Token Expired ]
   ↓
[ Refresh Endpoint ]
   ↓
Generate New Access + Refresh Tokens
   ↓
[ Continue API Access ]
```

---

### 🔐 Example

#### 1. Login
```
POST /login
{
  "username": "suraj",
  "password": "mypassword"
}
```

Response:
```json
{
  "accessToken": "<jwt_access_token>",
  "refreshToken": "<jwt_refresh_token>"
}
```

#### 2. API Request
```
GET /user/profile
Authorization: Bearer <jwt_access_token>
```

If access token expired ⏳ → client calls:
```
POST /auth/refresh
{
  "refreshToken": "<jwt_refresh_token>"
}
```

Server verifies refresh token:
- If valid → issues **new access + refresh tokens**.
- If reused/invalid → rejects (possible theft).

---

### 🧱 Secure Practices

1. Store refresh tokens in **HttpOnly + Secure cookies**.  
2. Keep access tokens short-lived (10–15 mins).  
3. Use **rotation** — every refresh gives a new refresh token and invalidates the old one.  
4. Revoke tokens immediately on logout or password reset.  
5. Always use **HTTPS**.

---

## ⚡ Quick Summary

| Feature | Session ID | JWT (Access + Refresh) |
|----------|-------------|------------------------|
| **Type** | Stateful | Stateless |
| **Storage** | Server | Client |
| **Scalability** | Low | High |
| **Revocation** | Easy | Complex |
| **Use Case** | Monolithic apps | APIs, Microservices |
| **Performance** | Needs DB lookup | No lookup needed |
| **Security** | Cookie/session-based | Token signature-based |

---

## ✅ When to Use Which

| Use Case | Best Approach |
|-----------|----------------|
| Small web app (single server) | Session-based |
| RESTful API / SPA / Mobile | JWT-based |
| Distributed microservices | JWT-based |
| Need instant revocation | Session-based |

---

## 🧩 Final Thoughts

- **Sessions** are easier to implement but require **server storage**.
- **JWTs** are scalable and ideal for APIs but need careful handling of **expiration and refresh tokens**.
- Always use **short-lived access tokens** + **rotating refresh tokens** for production security.

---

> 💡 **Pro Tip:**  
> In a microservices architecture, prefer **JWT access tokens** and manage refresh token state (rotation, revocation) in a centralized **Auth service**.


