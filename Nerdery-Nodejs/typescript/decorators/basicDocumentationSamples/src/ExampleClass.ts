import { first, second } from "../decorators/methods";


export class ExampleClass {
  @first()
  @second()
  method() { }
}

