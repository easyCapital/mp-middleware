import { ArrayToObject } from '../../../Helpers';
import { Proposition, Portfolio } from '../../../Models/Proposition';
import BackendApi from '..';

const Logger = use('Logger');

export default async function getPropositionDetails(backendApi: BackendApi, data: any): Promise<Proposition> {
  const proposition = new Proposition(data);

  proposition.setPortfolios([]);

  if (data.contents && data.contents.length > 0) {
    const portfolioIds = data.contents.map((item) => item.portfolio);

    const portfolios = await backendApi.findPortfolios({ id__in: portfolioIds });

    const portfoliosById: { [id: string]: Portfolio } = ArrayToObject(portfolios);

    data.contents.forEach((item) => {
      const portfolio = portfoliosById[item.portfolio];

      if (portfolio) {
        portfolio.setSrri(item.srri).setAmount(item.amount);

        proposition.addPortfolio(portfolio);
      } else {
        Logger.warning('Portfolio with identifier %s could not be found', item.portfolio);
      }
    });
  }

  return proposition;
}
