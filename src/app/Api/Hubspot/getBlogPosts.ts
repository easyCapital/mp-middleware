import { Filters } from '@robinfinance/js-api';

import { BlogPost } from '../../Models/Blog';
import { Exception } from '../../Exceptions';

const HubspotClient = use('HubspotClient');

async function getBlogPosts(filters?: Filters): Promise<BlogPost[]> {
  try {
    const response = await HubspotClient.get({
      url: 'blog-posts',
      filters: filters ? { ...filters, state: 'published' } : { state: 'published' },
    });

    const data = await response.json();

    const posts = data.objects.map((item) => new BlogPost(item));

    return posts;
  } catch (exception: any) {
    throw new Exception(exception);
  }
}

export default getBlogPosts;
