import { ContentTypes } from 'mieuxplacer-js-api';

import Advice from '../../../Models/Prismic/Advice';
import { getOne } from '..';

export default async function getAvice(slug: string): Promise<Advice> {
  const response = await getOne(ContentTypes.ADVICE, slug);
  const advice = new Advice(response);

  return advice;
}
