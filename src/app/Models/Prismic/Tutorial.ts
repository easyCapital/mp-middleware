import { ContentType, Video, Image } from '.';

export default class Tutorial extends ContentType {
  private title: string;
  private image: Image;
  private duration: string;
  private order: number;
  private video: Video;

  constructor(json: any) {
    super(json);

    this.title = json.data.title[0].text;
    this.duration = json.data.duration;
    this.image = new Image(json.data.preview);
    this.order = json.data.order;
    this.video = new Video(json.data.video);
  }

  public toJSON(): any {
    return {
      id: this.id,
      slug: this.slug,
      updatedAt: this.updated,
      title: this.title,
      image: this.image,
      duration: this.duration,
      order: this.order,
      video: this.video.toJSON(),
    };
  }
}
