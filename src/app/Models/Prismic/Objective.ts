import { ContentType } from '.';

interface ObjectiveInterface {
  toJSON(): any;
}

export default class Objective extends ContentType implements ObjectiveInterface {
  constructor(json: any) {
    super(json);
  }

  public toJSON(): any {
    return {
      id: this.id,
      slug: this.slug,
    };
  }
}
