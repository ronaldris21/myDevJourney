function map(arr: number[], fn: (n: number, i: number) => number): number[] {
    let arr2:number[] = [];

    for(let i=0; i<arr.length; i++)
    {
        arr2.push(fn(arr[i],i));
    }
    return arr2;
};

// function map(arr: number[], fn: (n: number, i: number) => number): number[] {
//     let arr2:number[] = [];
//     let i = 0;
//     arr.forEach(n=> arr2.push(fn(n,i++)))

//     return arr2;
// };