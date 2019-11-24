import { Portfolio, Proposition } from '../../../../Models/Proposition';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import { PortfolioDTO } from '../../DTO';
import BackendApi from '../..';

export default async function createCustomerProposition(
  this: BackendApi,
  customerId: string,
  universe: string,
  portfoliosDTO: PortfolioDTO[],
): Promise<Proposition> {
  const portfolios: Portfolio[] = [];

  for await (const portfolioDTO of portfoliosDTO) {
    const portfolio = await this.createCGPPortfolio(universe, portfolioDTO);

    portfolios.push(portfolio);
  }

  try {
    const formattedPortfolios = portfolios.map(item => ({ portfolio: item.getId(), amount: item.getAmount() }));

    const response = await this.backendClient.post(
      {
        url: 'proposition/cgp/create',
      },
      {
        user: customerId,
        universe,
        contents: formattedPortfolios,
      },
    );

    const data = await response.json();

    const proposition = new Proposition(data);

    return proposition;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
