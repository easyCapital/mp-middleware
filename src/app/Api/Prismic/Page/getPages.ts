import { ContentTypes } from '@robinfinance/js-api';

import { Page } from '../../../Models/Prismic';
import { getAll } from '..';

export default async function getPages(
  filters?: { [filter: string]: string | string[] },
  orderBy?: string,
): Promise<Page[]> {
  const response = await getAll(ContentTypes.PAGE, filters, orderBy);
  const pages: Page[] = [];

  response.forEach(item => {
    const page = new Page(item);

    pages.push(page);
  });

  return pages;
}
