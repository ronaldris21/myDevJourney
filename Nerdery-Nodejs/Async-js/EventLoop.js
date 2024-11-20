// Module 2 - Asynchronous Programming - call stakc, event Loop, callback queue

/**
 * Call stack
 *      It runs one thing at the time (single threaded)
 *
 * blocking (code slow)
 *
 *
 * Event loop
 *
 *
 * callback queue
 *
 */

Promise.resolve().then(() => console.log(2));

setTimeout(() => console.log(5), 10);

queueMicrotask(() => {
  console.log(3);
  queueMicrotask(() => console.log(4));
});

console.log(1);

// OUTPUT: 1,2,3,4,5
