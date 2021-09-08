import { ContentType } from '@robinfinance/js-api';

interface LinkInterface {
  toJSON(): any;
}

export default class Link implements LinkInterface {
  private target: '_blank' | '_parent';
  private linkType: 'Document' | 'Web';
  private type?: string;
  private uid?: string;
  private url?: string;

  constructor(json: any) {
    this.target = json.target;
    this.linkType = json.link_type;
    this.type = json.type;
    this.uid = json.uid;
    this.url = json.url;
  }

  public toJSON(): any {
    return {
      target: this.target,
      linkType: this.linkType,
      type: this.type as ContentType,
      uid: this.uid,
      url: this.url,
    };
  }
}
