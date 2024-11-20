/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function (arr1, arr2) {

    const joinedMap = new Map();

    arr1.forEach(a => {
        let id = a.id;
        joinedMap[id] = { ...a };
        // console.log(joinedMap);
    })

    // console.log(joinedMap);

    // Explanation: The two objects with id=1 and id=3 are included in the result array without modifiction. The two objects with id=2 are merged together. The keys from arr2 override the values in arr1.

    arr2.forEach(a => {


        let id = a.id;
        ///Previous + new Data
        joinedMap[id] = {
            ...joinedMap[id],
            ...a
        };
    })

    return Object.values(joinedMap);
    // console.log(joinedMap);

    // const joinedArray = [];
    // for(let key in joinedMap)
    // {
    //     joinedArray.push({
    //         id:Number(key),
    //         ...joinedMap[key],
    //     })
    // }

    // return joinedArray;

};