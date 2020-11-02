import { ClientTypes, ContentTypes, Filters } from '@robinfinance/js-api';

import { Tutorial } from '../../../Models/Prismic';
import { NotFoundException } from '../../../Mappers/Exceptions';
import { getAll } from '..';

export default async function getTutorials(
  filters?: Filters,
  linked?: { [key: string]: string | string[] },
  fields?: string | string[],
  orderBy?: string,
): Promise<Tutorial[]> {
  let formattedFilters: Filters = {};

  if (filters) {
    if ('type' in filters) {
      if (filters.type === ClientTypes.CGP) {
        formattedFilters.show_cgp = 'Oui';
      } else if (filters.type === ClientTypes.COURTIER) {
        formattedFilters.show_courtier = 'Oui';
      } else if (filters.type === ClientTypes.ASSET_MANAGER) {
        formattedFilters.show_asset_manager = 'Oui';
      }

      delete filters.type;
    }

    formattedFilters = { ...formattedFilters, ...filters };
  }

  const response = await getAll(ContentTypes.TUTORIAL, formattedFilters, linked, fields, orderBy);

  if (response.length > 0) {
    const tutorials: Tutorial[] = [];

    response.forEach((item) => {
      tutorials.push(new Tutorial(item));
    });

    return tutorials;
  }

  throw new NotFoundException("Ce contenu n'existe pas");
}
