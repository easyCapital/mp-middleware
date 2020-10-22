import { ContentTypes } from '@robinfinance/js-api';

import { Tutorial } from '../../../Models/Prismic';
import { NotFoundException } from '../../../Mappers/Exceptions';
import { getAll } from '..';

export default async function getTutorials(
  filters?: { [filter: string]: string | string[] },
  linked?: { [key: string]: string | string[] },
  fields?: string | string[],
  orderBy?: string,
): Promise<Tutorial[]> {
  const response = await getAll(ContentTypes.TUTORIAL, filters, linked, fields, orderBy);

  if (response.length > 0) {
    const tutorials: Tutorial[] = [];

    response.forEach((item) => {
      tutorials.push(new Tutorial(item));
    });

    return tutorials;
  }

  throw new NotFoundException("Ce contenu n'existe pas");
}
