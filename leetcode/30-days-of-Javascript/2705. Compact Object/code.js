/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function (obj) {

    // I'll try a recursive form taking in account if it's an object or an array
    if (Array.isArray(obj))
        return obj.filter(Boolean).map(compactObject); ///Check
    if (typeof obj !== "object")
        return obj;

    //IT CAN BE A MAP OBJECTI WITH KEYS
    return Object.entries(obj).reduce((finalObject, [key, val]) => {
        if(val){
            // finalObject[key] = val; //Not working, I have to search inside if it's an object or an array!
            finalObject[key] = compactObject(val);
        }
        return finalObject;
    }, {});


};