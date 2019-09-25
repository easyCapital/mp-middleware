import { Page as JsonPageInterface, ContentTypes } from 'mieuxplacer-js-api';

import { Page } from '../../../Models/Prismic';
import { find } from '..';

export default async function findPages(filters: {
  [filter: string]: string | string[];
}): Promise<JsonPageInterface[]> {
  const response = await find(ContentTypes.PAGE, filters);
  const pages: JsonPageInterface[] = [];

  response.forEach(item => {
    const page = new Page(item);

    pages.push(page.toJson());
  });

  return pages;
}
