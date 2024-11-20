type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type Fn = (value: JSONValue) => number

function sortBy(arr: JSONValue[], fn: Fn): JSONValue[] {


    return arr.sort((a: JSONValue, b: JSONValue) => fn(a) - fn(b));

};