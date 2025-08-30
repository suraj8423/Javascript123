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

