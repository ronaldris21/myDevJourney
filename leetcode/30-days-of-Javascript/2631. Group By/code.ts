interface Array<T> {
    groupBy(fn: (item: T) => string): Record<string, T[]>
}

Array.prototype.groupBy = function (fn) {
    const result = {};

    this.forEach(a => {
        var key = fn(a);
        if (result[key]) {
            result[key].push(a);
        }
        else {
            result[key] = [a];
        }
    })

    return result;
}

// //Second solution (but first was better!)
// interface Array<T> {
//     groupBy(fn: (item: T) => string): Record<string, T[]>
// }


// Array.prototype.groupBy = function (fn) {

//     return this.reduce((groups, item) => {
//         let key = fn(item);

//         if (key in groups) {
//             groups[key].push(item);
//         }
//         else {
//             groups[key] = [item];
//         }
//         return groups;

//     }, {})


// }

// /**
//  * [1,2,3].groupBy(String) // {"1":[1],"2":[2],"3":[3]}
//  */