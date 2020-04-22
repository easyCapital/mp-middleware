import { ContentTypes } from '@robinfinance/js-api';

import Advice from '../../../Models/Prismic/Advice';
import { find } from '..';

export default async function findAdvices(
  filters?: { [filter: string]: string | string[] },
  linked?: { [key: string]: string | string[] },
  fields?: string | string[],
  orderBy?: string,
): Promise<Advice[]> {
  const response = await find(ContentTypes.ADVICE, filters, linked, fields, orderBy);
  const advices: Advice[] = [];

  response.forEach((item) => {
    const advice = new Advice(item);

    advices.push(advice);
  });

  return advices;
}
