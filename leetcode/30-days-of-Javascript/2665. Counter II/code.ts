type Counter = {
    increment: () => number,
    decrement: () => number,
    reset: () => number,
}

function createCounterII(init: number): Counter {
    let init0 = init;
    return {
        increment(): number {
            return ++init;
        },
        decrement(): number {
            return --init;
        },
        reset(): number {
            init = init0;
            return init;
        }
    }

};

/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */