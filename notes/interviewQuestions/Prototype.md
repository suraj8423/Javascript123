# 🧠 JavaScript Prototype & Prototypal Inheritance — Quick Notes

---

## 🔹 What is a Prototype?

- In JavaScript, **every object** has a hidden property called `[[Prototype]]` (accessible via `__proto__`).
- This prototype acts as a **fallback** for properties and methods.
- If a property isn’t found on the object, JS looks up the **prototype chain**.

---

## 🔹 What is Prototypal Inheritance?

> It’s the mechanism by which one object can inherit properties and methods from another object via its prototype.

✅ **Key Point:**  
Objects in JavaScript can directly inherit from other objects.

---

## 🔹 Example 1: Basic Prototype Usage

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Add a method to the prototype
Person.prototype.sayHello = function() {
  console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
};

const p1 = new Person("Suraj", 24);
const p2 = new Person("Ravi", 25);

p1.sayHello();
p2.sayHello();
```

🧬 `sayHello` is shared through the prototype, not copied to each instance.

---

## 🔹 Prototype Chain Visualization

```javascript
console.log(p1.__proto__ === Person.prototype);       // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__);              // null
```

🔗 **Chain:**  
`p1 → Person.prototype → Object.prototype → null`

---

## 🔹 Example 2: Prototypal Inheritance Between Constructors

```javascript
function Employee(name, age, role) {
  Person.call(this, name, age);
  this.role = role;
}

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.work = function() {
  console.log(`${this.name} works as a ${this.role}.`);
};

const emp = new Employee("Suraj", 24, "Frontend Developer");
emp.sayHello(); // From Person
emp.work();     // From Employee
```

🤠 `Employee.prototype` inherits from `Person.prototype`.

---

## 🔹 Example 3: ES6 Class Syntax (Syntactic Sugar)

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHello() {
    console.log(`Hi, I'm ${this.name}`);
  }
}

class Employee extends Person {
  constructor(name, age, role) {
    super(name, age);
    this.role = role;
  }
  work() {
    console.log(`${this.name} works as a ${this.role}`);
  }
}

const e1 = new Employee("Suraj", 24, "Frontend Developer");
e1.sayHello();
e1.work();
```

➡️ Under the hood, ES6 `class` still uses prototypes.

---

## 🔹 Summary

- Every object has a **prototype**.
- **Prototypal inheritance** allows objects to share methods efficiently.
- JS looks up the **prototype chain** until it finds the property or reaches `null`.
- ES6 `class` syntax simplifies working with prototypes but doesn’t change how inheritance works.

---

## 💬 Common Interview Question

**Q:** How does JavaScript find a property on an object?  
**A:** It first checks the object itself, then looks up the prototype chain (`__proto__`), until it finds the property or reaches `null`.

---