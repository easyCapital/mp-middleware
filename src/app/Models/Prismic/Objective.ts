// import { Page as JsonPageInterface } from 'mieuxplacer-js-api';

import { ContentType } from '.';

interface ObjectiveInterface {
  toJson(): any;
}

export default class Objective extends ContentType implements ObjectiveInterface {
  constructor(json: any) {
    super(json);
  }

  public toJson(): any {
    return {
      id: this.id,
      slug: this.slug,
    };
  }
}
