interface RichTextInterface {
  toJson(): any;
}

export default class RichText implements RichTextInterface {
  // private type: string;
  // private text: string;
  // private;

  constructor(json: any) {
    // this.id = json.id;
    // this.slug = json.uid;
    // this.name = json;
  }

  public toJson(): any {
    return {};
  }
}
