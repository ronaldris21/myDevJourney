import { validate, required } from "../decorators/parameter";

export class BugReport {
    type = "report";
    title: string;

    constructor(t: string) {
        this.title = t;
    }

    // @validate()
    print(@required verbose: boolean) {
        if (verbose) {
            return `type: ${this.type}\ntitle: ${this.title}`;
        } else {
            return this.title;
        }
    }
}