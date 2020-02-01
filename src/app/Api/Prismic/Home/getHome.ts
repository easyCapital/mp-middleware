import { ContentTypes } from '@robinfinance/js-api';

import { Home } from '../../../Models/Prismic';
import { NotFoundException } from '../../../Mappers/Exceptions';
import { getAll } from '..';

export default async function getHome(): Promise<Home> {
  const response = await getAll(ContentTypes.HOME);

  if (response.length > 0) {
    const home = new Home(response[0]);

    return home;
  }

  throw new NotFoundException("Ce contenu n'existe pas");
}
