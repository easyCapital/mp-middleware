import { ContentTypes } from 'mieuxplacer-js-api';

import Advice from '../../../Models/Prismic/Advice';
import { find } from '..';

export default async function findAdvices(filters: { [filter: string]: string | string[] }): Promise<Advice[]> {
  const response = await find(ContentTypes.ADVICE, filters);
  const advices: Advice[] = [];

  response.forEach(item => {
    const advice = new Advice(item);

    advices.push(advice);
  });

  return advices;
}
