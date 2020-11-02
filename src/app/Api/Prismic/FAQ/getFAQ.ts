import { ClientTypes, ContentTypes, Filters } from '@robinfinance/js-api';

import { FAQ } from '../../../Models/Prismic';
import { NotFoundException } from '../../../Mappers/Exceptions';
import { getAll } from '..';

export default async function getFAQ(
  filters?: Filters,
  linked?: { [key: string]: string | string[] },
  fields?: string | string[],
  orderBy?: string,
): Promise<FAQ[]> {
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

  const response = await getAll(ContentTypes.FAQ, formattedFilters, linked, fields, orderBy);

  if (response.length > 0) {
    const questions: FAQ[] = [];

    response.forEach((item) => {
      questions.push(new FAQ(item));
    });

    return questions;
  }

  throw new NotFoundException("Ce contenu n'existe pas");
}
