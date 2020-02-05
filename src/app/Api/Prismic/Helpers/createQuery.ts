import Prismic from 'prismic-javascript';
import { ContentType } from '@robinfinance/js-api';

function createQuery(
  type: ContentType,
  filters?: {
    [filter: string]: string | string[];
  },
): string[] {
  const query: string[] = [Prismic.Predicates.at('document.type', type)];

  if (filters) {
    Object.keys(filters).forEach(filter => {
      const value = filters[filter];

      if (Array.isArray(value)) {
        query.push(Prismic.Predicates.any(`my.${type}.${filter}`, value));
      } else if (value.indexOf('!') !== -1) {
        query.push(Prismic.Predicates.not(`my.${type}.${filter}`, value.replace('!', '')));
      } else {
        query.push(Prismic.Predicates.at(`my.${type}.${filter}`, value));
      }
    });
  }

  return query;
}

export default createQuery;
