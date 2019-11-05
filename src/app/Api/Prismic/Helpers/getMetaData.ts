import { MetaData } from '@robinfinance/js-api';

function getMetaData(response): MetaData {
  return {
    page: response.page,
    perPage: response.results_per_page,
    size: response.results_size,
    totalPages: response.total_pages,
    totalSize: response.total_results_size,
    nextPage: response.page < response.total_pages ? response.page + 1 : undefined,
    prevPage: response.page > 1 ? response.page - 1 : undefined,
  };
}

export default getMetaData;
