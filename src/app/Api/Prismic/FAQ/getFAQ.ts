import { ContentTypes } from '@robinfinance/js-api';

import { FAQ } from '../../../Models/Prismic';
import { NotFoundException } from '../../../Mappers/Exceptions';
import { getAll } from '..';

export default async function getFAQ(
  filters?: { [filter: string]: string | string[] },
  linked?: { [key: string]: string | string[] },
  fields?: string | string[],
  orderBy?: string,
): Promise<FAQ[]> {
  const response = await getAll(ContentTypes.FAQ, filters, linked, fields, orderBy);

  if (response.length > 0) {
    const questions: FAQ[] = [];

    response.forEach((item) => {
      questions.push(new FAQ(item));
    });

    return questions;
  }

  throw new NotFoundException("Ce contenu n'existe pas");
}
