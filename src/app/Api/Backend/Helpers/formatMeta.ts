import { Pagination, Meta } from '@robinfinance/js-api';

function formatMeta(headers: Headers, pagination: Pagination = { page: 1, perPage: 100 }): Meta {
  const contentRange = headers.get('Content-Range');

  const page = Number(pagination.page);
  const perPage = Number(pagination.perPage);

  let totalSize: number | undefined;
  let totalPages: number | undefined;
  let size: number | undefined;
  let prevPage: number | undefined;
  let nextPage: number | undefined;

  if (contentRange) {
    const contentRangeElements = contentRange.match(/(\d+)-(\d+)\/(\d+)/);

    if (contentRangeElements) {
      const currentMinRange = Number(contentRangeElements[1]);
      const currentMaxRange = Number(contentRangeElements[2]);

      totalSize = Number(contentRangeElements[3]);
      totalPages = Math.ceil(totalSize / perPage);
      size = currentMaxRange - currentMinRange;

      if (currentMinRange > 0) {
        prevPage = page - 1;
      }

      if (currentMaxRange < totalSize) {
        nextPage = page + 1;
      }
    }
  }

  return {
    page,
    prevPage,
    nextPage,
    perPage,
    size,
    totalSize,
    totalPages,
  };
}

export default formatMeta;
