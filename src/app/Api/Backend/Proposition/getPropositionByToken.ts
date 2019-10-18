import { ArrayToObject } from '../../../Helpers';
import { Proposition, Portfolio } from '../../../Models/Proposition';
import { findProducts, findAdvices } from '../../Prismic';
import { Product } from '../../../Models/Prismic';
import { PropositionException } from '../Exceptions';
import BackendApi from '..';

export default async function getPropositionByToken(this: BackendApi, token: string): Promise<Proposition> {
  try {
    const response = await this.backendClient.get({ url: `proposition/get/token/${token}` });
    const data = await response.json();

    const proposition = new Proposition(data);

    if (data.contents.length > 0) {
      const portfolioIds = data.contents.map(item => item.portfolio);
      const portfolioProducts = data.contents.map(item => item.product_identifier);

      const [portfolios, products, advices] = await Promise.all([
        this.findPortfolios({ id__in: portfolioIds }),
        findProducts({ backend_key: portfolioProducts }),
        findAdvices({ key: data.risk_advice }),
      ]);

      const portfoliosById: { [id: string]: Portfolio } = ArrayToObject(portfolios);
      const productsById: { [id: string]: Product } = ArrayToObject(products, 'identifier');

      proposition.setInvestorType(advices[0]);

      data.contents.forEach(item => {
        const portfolio = portfoliosById[item.portfolio];
        const product = productsById[item.product_identifier];

        portfolio
          .setProduct(product)
          .setSrri(item.srri)
          .setAmount(item.amount);

        proposition.addPortfolio(portfolio);
      });
    }

    return proposition;
  } catch (exception) {
    const data = await exception.json();

    throw new PropositionException(data);
  }
}
