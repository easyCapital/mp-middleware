import { Page as JsonPageInterface, ContentTypes } from 'mieuxplacer-js-api';

import { Page } from '../../../Models/Prismic';
import { getAll } from '..';

export default async function getPages(): Promise<JsonPageInterface[]> {
  const response = await getAll(ContentTypes.PAGE);
  const pages: JsonPageInterface[] = [];

  response.forEach(item => {
    const page = new Page(item);

    pages.push(page.toJson());
  });

  return pages;
}
