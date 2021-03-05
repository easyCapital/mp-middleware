import { Fund, Portfolio } from '../../../../Models/Proposition';
import { Exception } from '../../../../Exceptions';
import { ArrayToObject } from '../../../../Helpers';
import BackendApi from '../..';

export default async function getRecommendedPortfolio(
  this: BackendApi,
  customerId: string | number,
  studyId: string | number,
  productIdentifier: string,
): Promise<Portfolio | void> {
  try {
    const response = await this.backendClient.get({
      url: `cgp/customer/${customerId}/study/${studyId}/product/${productIdentifier}/get_portfolio_recommendation`,
    });

    if (response.status !== 204) {
      const data = await response.json();

      if (data) {
        const portfolio: Portfolio = new Portfolio(data);

        const fundIds = data.lines.map((item) => item.line);
        const funds = await this.findFunds(undefined, { id__in: fundIds });
        const fundsById: { [id: string]: Fund } = ArrayToObject(funds.results);

        data.lines.forEach((item) => {
          const fund = fundsById[item.line];

          if (fund) {
            fund.setWeight(item.weight);

            portfolio.addFund(fund);
          }
        });

        return portfolio;
      }
    }
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new Exception(JSON.stringify(error));
    }

    throw new Exception(exception);
  }
}
