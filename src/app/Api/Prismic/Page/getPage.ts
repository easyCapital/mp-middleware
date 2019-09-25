import { Page as JsonPageInterface, ContentTypes } from 'mieuxplacer-js-api';

import { Page } from '../../../Models/Prismic';
import { getOne } from '..';

export default async function getPage(slug: string): Promise<JsonPageInterface> {
  const response = await getOne(ContentTypes.PAGE, slug);
  const page = new Page(response);

  return page.toJson();
}
