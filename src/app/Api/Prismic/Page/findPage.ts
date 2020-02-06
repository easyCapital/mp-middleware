import { ContentTypes } from '@robinfinance/js-api';

import { Page } from '../../../Models/Prismic';
import { findOne } from '..';

export default async function findPages(
  filters?: { [filter: string]: string | string[] },
  linked?: { [key: string]: string | string[] },
  fields?: string | string[],
): Promise<Page> {
  const response = await findOne(ContentTypes.PAGE, filters, linked, fields);

  const page = new Page(response);

  return page;
}
