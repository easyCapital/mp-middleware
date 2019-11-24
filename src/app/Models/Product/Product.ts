export default class Product {
  private id: number;
  private identifier: string;
  private name: string;

  constructor(json: any) {
    this.id = json.id;
    this.identifier = json.identifier;
    this.name = json.name;
  }

  public getId() {
    return this.id;
  }

  public getIdentifier() {
    return this.identifier;
  }

  public getName() {
    return this.name;
  }
}
