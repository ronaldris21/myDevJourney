type Fn = (...params: number[]) => number

function memoize(fn: Fn): Fn {
    let memo = new Map();

    return function (...args) {
        let input = JSON.stringify(args);
        if (memo.has(input))
            return memo.get(input);
        else {
            let result = fn(...args);
            memo.set(input, result);
            return result;
        }
    }
}


/** 
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1 
 */