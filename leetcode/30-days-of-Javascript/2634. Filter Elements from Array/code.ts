type Fn = (n: number, i: number) => any

function filter(arr: number[], fn: Fn): number[] {
    // return arr.filter((x,i )=> fn(x,i));
    let filteredArr: number[] = [];

    arr.forEach((n, i) => {
        if (fn(n, i))
            filteredArr.push(n);
    })
    return filteredArr;
};