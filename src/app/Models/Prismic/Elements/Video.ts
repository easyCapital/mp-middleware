import { Video as JsonVideoInterface } from '@robinfinance/js-api';

interface VideoInterface {
  toJSON(): JsonVideoInterface;
}

export default class Video implements VideoInterface {
  private type: string;
  private url: string;

  constructor(json: any) {
    this.type = json.url.substr(json.url.lastIndexOf('.') + 1);
    this.url = json.url;
  }

  public toJSON(): JsonVideoInterface {
    return {
      type: this.type,
      url: this.url,
    };
  }
}
