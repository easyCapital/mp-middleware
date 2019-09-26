import { ContentTypes } from 'mieuxplacer-js-api';

import { Page } from '../../../Models/Prismic';
import { getAll } from '..';

export default async function getPages(): Promise<Page[]> {
  const response = await getAll(ContentTypes.PAGE);
  const pages: Page[] = [];

  response.forEach(item => {
    const page = new Page(item);

    pages.push(page);
  });

  return pages;
}
