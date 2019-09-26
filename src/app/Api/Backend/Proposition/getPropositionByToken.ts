import { ArrayToObject } from '../../../Helpers';
import { Proposition, Portfolio } from '../../../Models/Proposition';
import { Product } from '../../../Models/Prismic';
import { Exception } from '../../../Exceptions';
import { findPortfolios } from '../Portfolio';
import { findProducts } from '../../Prismic';

const BackendClient = use('BackendClient');

export default async function getPropositionByToken(token: string): Promise<Proposition> {
  try {
    const response = await BackendClient.get({ url: `proposition/get/token/${token}` });
    const data = await response.json();

    const proposition = new Proposition(data);

    const portfolioIds = data.contents.map(item => item.portfolio);
    const portfolioProducts = data.contents.map(item => item.product_identifier);

    const [portfolios, products] = await Promise.all([
      findPortfolios({ id__in: portfolioIds }),
      findProducts({ backend_key: portfolioProducts }),
    ]);

    const portfoliosById: { [id: string]: Portfolio } = ArrayToObject(portfolios);
    const productsById: { [id: string]: Product } = ArrayToObject(products, 'identifier');

    data.contents.forEach(item => {
      const portfolio = portfoliosById[item.portfolio];
      const product = productsById[item.product_identifier];

      portfolio
        .setProduct(product)
        .setSrri(item.srri)
        .setAmount(item.amount);

      console.log(portfolio);

      proposition.addPortfolio(portfolio);
    });

    return proposition;
  } catch (error) {
    throw new Exception(error);
  }
}
