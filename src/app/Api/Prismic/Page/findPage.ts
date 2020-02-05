import { ContentTypes } from '@robinfinance/js-api';

import { Page } from '../../../Models/Prismic';
import { findOne } from '..';

export default async function findPages(filters?: { [filter: string]: string | string[] }): Promise<Page> {
  const response = await findOne(ContentTypes.PAGE, filters);

  const page = new Page(response);

  return page;
}
