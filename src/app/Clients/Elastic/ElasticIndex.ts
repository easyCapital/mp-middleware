export interface JsonIndexInterface {
  index: string;
  type: string;
  id: string;
  body: any;
}

export class ElasticIndex {
  protected index: string;
  protected type: string;
  protected id: number;

  constructor(id: number, type: string, index: string) {
    this.id = id;
    this.type = type;
    this.index = index;
  }
}

export interface ElasticIndexInterface extends ElasticIndex {
  toJSON(): JsonIndexInterface;
}
