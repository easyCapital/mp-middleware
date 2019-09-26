import { Image as JsonImageInterface } from 'mieuxplacer-js-api';

interface ImageInterface {
  toJSON(): JsonImageInterface;
}

export default class Image implements ImageInterface {
  private url: string;
  private alt?: string;

  constructor(json: any) {
    this.url = json.url;
    this.alt = json.alt;
  }

  public toJSON(): JsonImageInterface {
    return {
      url: this.url,
      alt: this.alt,
    };
  }
}
