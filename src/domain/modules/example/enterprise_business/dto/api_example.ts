export interface IExampleAPI {
  name: string,
  anyOtherValue: string
}

export class ExampleAPI implements IExampleAPI {
  name: string;
  anyOtherValue: string;
  constructor (item: IExampleAPI) {
    this.name = item.name;
    this.anyOtherValue = item.anyOtherValue;
  }
}
