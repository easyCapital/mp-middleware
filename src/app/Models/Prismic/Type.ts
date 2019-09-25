// import { Page as JsonPageInterface } from 'mieuxplacer-js-api';

import { ContentType } from '.';

interface TypeInterface {
  toJson(): any;
}

export default class Type extends ContentType implements TypeInterface {
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
