export default class ContentType {
  public id: string;
  public contentType: string;
  public created: string;
  public updated: string;
  public slug: string;

  constructor(json: any) {
    this.id = json.id;
    this.contentType = json.type;
    this.created = json.first_publication_date;
    this.updated = json.last_publication_date;
    this.slug = json.uid;
  }
}
