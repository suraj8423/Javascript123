# Pure and high order components

- A Pure Component in React is a component that renders the same output for the same state and props.

- A Higher-Order Component (HOC) is a function that takes a component as an argument and returns a new component with enhanced behavior or additional props.

- HOCs are used for code reuse, logic abstraction, and cross-cutting concerns.

```js
const EnhancedComponent = higherOrderComponent(WrappedComponent);

function withLogger(WrappedComponent) {
  return function Enhanced(props) {
    console.log("Props received:", props);
    return <WrappedComponent {...props} />;
  };
}

// Usage
const UserWithLogger = withLogger(User);

```