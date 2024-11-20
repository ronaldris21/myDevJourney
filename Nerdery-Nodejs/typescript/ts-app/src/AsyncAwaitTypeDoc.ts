// / printDelayed is a 'Promise<void>'
async function printDelayed(elements: string[]) {
    for (const element of elements) {
        await delay(333);
        console.log(element);
    }
}
async function delay(milliseconds: number) {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}
printDelayed(["Hello", "beautiful", "asynchronous", "world"]).then(() => {
    console.log("-----");
    console.log("Printed every element!");
});


export default class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number) {
        this.value += operand;
        return this;
    }
    public subtract(operand: number) {
        this.value -= operand;
        return this;
    }
    public multiply(operand: number) {
        this.value *= operand;
        return this;
    }
    public divide(operand: number) {
        this.value /= operand;
        return this;
    }
}

let calc