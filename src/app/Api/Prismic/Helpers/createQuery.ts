import Prismic from 'prismic-javascript';
import { ContentType } from '@robinfinance/js-api';

function createQuery(
  type: ContentType,
  filters?: {
    [filter: string]: string | string[];
  },
  linked?: { [key: string]: string | string[] },
): string[] {
  const query: string[] = [Prismic.Predicates.at('document.type', type)];

  if (filters) {
    Object.keys(filters).forEach(filter => {
      const value = filters[filter];

      if (filter === 'id') {
        if (Array.isArray(value)) {
          query.push(Prismic.Predicates.in('document.id', value));
        } else {
          query.push(Prismic.Predicates.at('document.id', value));
        }
      } else if (Array.isArray(value)) {
        query.push(Prismic.Predicates.any(`my.${type}.${filter}`, value));
      } else if (value.indexOf('!') !== -1) {
        query.push(Prismic.Predicates.not(`my.${type}.${filter}`, value.replace('!', '')));
      } else {
        query.push(Prismic.Predicates.at(`my.${type}.${filter}`, value));
      }
    });
  }

  if (linked) {
    Object.keys(linked).forEach(link => {
      const value = linked[link];
      const formattedValue = Array.isArray(value) ? value : [value];

      if (link === 'type') {
        query.push(Prismic.Predicates.any(`my.${type}.type`, formattedValue));
      } else if (link === 'objective') {
        query.push(Prismic.Predicates.any(`my.${type}.objectives.objective`, formattedValue));
      }
    });
  }

  return query;
}

export default createQuery;
