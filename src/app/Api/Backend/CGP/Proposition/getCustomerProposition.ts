import { Proposition, Portfolio } from '../../../../Models/Proposition';
import { Exception, NotFoundException } from '../../../../Exceptions';
import { ArrayToObject } from '../../../../Helpers';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getCustomerProposition(
  this: BackendApi,
  customerId: string,
  id: string,
): Promise<Proposition> {
  try {
    const response = await this.backendClient.get({
      url: 'proposition/cgp/search',
      filters: { user_id: customerId, id },
    });
    const data = await response.json();

    if (data.length > 0) {
      const rawProposition = data[0];
      const proposition = new Proposition(rawProposition);

      proposition.setPortfolios([]);

      if (rawProposition.contents && rawProposition.contents.length > 0) {
        const portfolioIds = rawProposition.contents.map(item => item.portfolio);

        const portfolios = await this.findPortfolios({ id__in: portfolioIds });

        const portfoliosById: { [id: string]: Portfolio } = ArrayToObject(portfolios);

        rawProposition.contents.forEach(item => {
          const portfolio = portfoliosById[item.portfolio];

          portfolio
            .setSrri(item.srri)
            .setAmount(item.amount)
            .setProductIdentifier(item.product_identifier);

          proposition.addPortfolio(portfolio);
        });
      }

      return proposition;
    }
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }

  throw new NotFoundException();
}
