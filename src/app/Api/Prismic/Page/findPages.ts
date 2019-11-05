import { ContentTypes } from '@robinfinance/js-api';

import { Page } from '../../../Models/Prismic';
import { find } from '..';

export default async function findPages(filters: { [filter: string]: string | string[] }): Promise<Page[]> {
  const response = await find(ContentTypes.PAGE, filters);
  const pages: Page[] = [];

  response.forEach(item => {
    const page = new Page(item);

    pages.push(page);
  });

  return pages;
}
