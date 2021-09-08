import { Filters, Pagination, Meta, OrderBy } from '@robinfinance/js-api';

import { Portfolio, Fund } from '../../../../Models/Proposition';
import { Exception } from '../../../../Exceptions';
import { ArrayToObject } from '../../../../Helpers';
import { formatMeta } from '../../Helpers';
import BackendApi from '../..';

export default async function searchPortfolios(
  this: BackendApi,
  pagination: Pagination = { page: 1, perPage: 100 },
  filters?: Filters,
  orderBy?: OrderBy,
): Promise<{ results: Portfolio[]; meta: Meta }> {
  try {
    const response = await this.backendClient.get({
      url: 'portfolio/search',
      pagination,
      filters,
      orderBy,
    });
    const data = await response.json();

    const meta = formatMeta(response.headers, pagination);

    const portfolios: Portfolio[] = [];

    for (const jsonPortfolio of data) {
      const portfolio = new Portfolio(jsonPortfolio);
      const fundIds = jsonPortfolio.lines.map((item) => item.line);

      const funds = await this.findFunds(undefined, { id__in: fundIds });
      const fundsById: { [id: string]: Fund } = ArrayToObject(funds.results);

      jsonPortfolio.lines.forEach((item) => {
        const fund = fundsById[item.line];

        if (fund) {
          fund.setWeight(item.weight);

          portfolio.addFund(fund);
        }
      });

      portfolios.push(portfolio);
    }

    return { results: portfolios, meta };
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new Exception(JSON.stringify(error));
    }

    throw new Exception(exception);
  }
}
