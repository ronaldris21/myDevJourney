type ToBeOrNotToBe = {
    toBe: (val: any) => boolean;
    notToBe: (val: any) => boolean;
};

function expect(originalVal: any): ToBeOrNotToBe {
    return {
        notToBe(val: any): boolean {
            if (val === originalVal)
                throw new Error("Equal");
            return true;
        },
        toBe(val: any): boolean {
            if (val !== originalVal)
                throw new Error("Not Equal");

            return true;
        }
    }

};

/**
 * expect(5).toBe(5); // true
 * expect(5).notToBe(5); // throws "Equal"
 */