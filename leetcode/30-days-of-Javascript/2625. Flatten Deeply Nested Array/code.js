/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
var flat = function (arr, n) {
    //Different approach!
    //Search each element and if it has depth (flat it!)

    if (n === 0)
        return arr;

    const RecursiveFlatArray = (tempA, level, maxLevel) => {
        ///IF IT DOESNT HAVE ANY ARRAY! I HAVE TO CUT RECURSION
        let hasArray = false;

        // console.log(`LEVEL: ${level}/${maxLevel} \t  Data: `, tempA);
        ///Last level! So I only return the data!
        if (level === maxLevel) {
            // console.log(`FINISHED: ${level}/${maxLevel} \t Data: `, tempA);
            return tempA;
        }

        //If not last level! I have to keep searching if more arrays!
        for (let i = 0; i < tempA.length; i++) {
            // console.log(tempA);
            if (Array.isArray(tempA[i])) {
                hasArray = true;

                let tempNewArray = RecursiveFlatArray(tempA[i], level + 1, maxLevel);
                let size = tempNewArray.length; //SIZE DEPENDS ON ALL THE SUB ARRAYS
                tempA = [
                    ...tempA.slice(0, i),
                    ...tempNewArray,
                    ...tempA.slice(i + 1)
                ]
                // console.log(`AFTER: ${level}/${maxLevel} \t Data: `, tempA);

                i = i + size - 1;
            }
        }



        return tempA; ///The flattend element!
    }


    var flattenArray = [];

    //Check and flatten each element!
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {

            let tempArrayResult = RecursiveFlatArray(arr[i], 1, n);
            let size = tempArrayResult.length;

            flattenArray.push(...tempArrayResult);
        }
        else {
            flattenArray.push(arr[i]);
        }
    }

    return flattenArray;




};