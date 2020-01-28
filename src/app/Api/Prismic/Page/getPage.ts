import { Page } from '../../../Models/Prismic';
import { getOne } from '..';

export default async function getPage(id: string): Promise<Page> {
  const response = await getOne(id);

  const page = new Page(response);

  return page;
}
