import { Filters } from '@robinfinance/js-api';

import { Context } from '../../../../types';
import * as hubspotApi from '../../../Api/Hubspot';

class BlogController {
  public async index({ request, response }: Context): Promise<void> {
    const filters = request.input('filters', {}) as Filters;

    const blogPosts = await hubspotApi.getBlogPosts(filters);

    response.status(200).send(blogPosts);
  }
}

export = BlogController;
