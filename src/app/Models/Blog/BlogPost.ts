import { BlogPost as JsonBlogPostInterface } from '@robinfinance/js-api';

interface BlogPostInterface {
  toJSON(): JsonBlogPostInterface;
}

export default class BlogPost implements BlogPostInterface {
  private id: number;
  private created: number;
  private url: string;
  private title: string;
  private author?: string;
  private imageUrl: string;
  private imageAlt: string;

  constructor(json: any) {
    this.id = json.id;
    this.created = json.published_at;
    this.url = json.url;
    this.title = json.name;
    this.imageUrl = json.featured_image;
    this.imageAlt = json.featured_image_alt_text;

    if (json.blog_post_author && json.blog_post_author.full_name) {
      this.author = json.blog_post_author.full_name;
    }
  }

  public toJSON(): JsonBlogPostInterface {
    return {
      id: this.id,
      created: this.created,
      url: this.url,
      title: this.title,
      author: this.author,
      imageUrl: this.imageUrl,
      imageAlt: this.imageAlt,
    };
  }
}
