# Custom Promise Library (MyPromise)

A from-scratch implementation of a JavaScript `Promise`-like class designed to understand how promises work internally — including state transitions, chaining, microtask scheduling, and static utility methods.

This project is intentionally **educational**, focusing on clarity and correctness of core behaviors rather than full Promise/A+ specification coverage.

---

## Features

### Core Promise Behavior
- Custom `MyPromise` class with executor function
- Internal state management:
  - `pending`
  - `fulfilled`
  - `rejected`
- Stores resolved value or rejection reason
- Handles synchronous errors thrown inside the executor

### Instance Methods
- `.then(onFulfilled, onRejected)`
  - Supports multiple chained handlers
  - Returns a new promise for chaining
- `.catch(onRejected)`
  - Implemented internally using `.then`
- `.finally(onFinally)`
  - Executes regardless of resolution or rejection
  - Preserves the original promise outcome

### Chaining & Resolution Logic
- Correct promise chaining behavior
- Handles:
  - Returned values
  - Thrown errors
  - Returned promises (nested promise resolution)
- Ensures proper propagation through chained calls

### Asynchronous Execution
- Guarantees asynchronous callback execution using `queueMicrotask`
- Mimics native Promise microtask timing
- Detects and reports unhandled promise rejections

### Static Methods
- `MyPromise.resolve(value)`
- `MyPromise.reject(reason)`
- `MyPromise.all(promises)`
- `MyPromise.allSettled(promises)`
- `MyPromise.race(promises)`
- `MyPromise.any(promises)`
  - Uses `AggregateError` when all promises reject

---

## Example Usage

```js
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve(10), 1000);
});

promise
  .then(value => value * 2)
  .then(result => console.log(result)) // 20
  .catch(error => console.error(error))
  .finally(() => console.log('Done'));
```

### Testing
- Tests written using Jest
- Covers:
  - Resolution and rejection flow
  - Chaining correctness
  - Static method behavior
  - Asynchronous execution order

## Run tests:

```js
npm test
```











