import { ArrayToObject } from '../../../Helpers';
import { Fund, Portfolio } from '../../../Models/Proposition';
import { Exception } from '../../../Exceptions';
import { findFunds } from '../Fund';

const BackendClient = use('BackendClient');

export default async function findPortfolios(filters: { [filter: string]: string | string[] }): Promise<Portfolio[]> {
  try {
    const response = await BackendClient.get({
      url: 'portfolio/search',
      filters,
    });
    const data = await response.json();

    const portfolios: Portfolio[] = [];

    for (const jsonPortfolio of data) {
      const portfolio = new Portfolio(jsonPortfolio);
      const fundIds = jsonPortfolio.lines.map(item => item.line);

      const funds = await findFunds({ id__in: fundIds });
      const fundsById: { [id: string]: Fund } = ArrayToObject(funds);

      jsonPortfolio.lines.forEach(item => {
        const fund = fundsById[item.line];

        fund.setWeight(item.weight);

        portfolio.addFund(fund);

        portfolios.push(portfolio);
      });
    }

    return portfolios;
  } catch (error) {
    throw new Exception(error);
  }
}
