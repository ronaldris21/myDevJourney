type Fn = (accum: number, curr: number) => number

function reduce(nums: number[], fn: Fn, init: number): number {

    let accum = init;
    nums.forEach(n=>{
        accum = fn(accum, n)
    })

    return accum;
    
};