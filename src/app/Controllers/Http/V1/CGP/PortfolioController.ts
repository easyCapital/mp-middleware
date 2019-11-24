import { Context } from '../../../../../types';

class CGPPortfolioController {
  public async prevalidate({ request, response, backendApi }: Context) {
    const portfolio = request.post() as any;

    await backendApi.prevalidateCGPPortfolio(portfolio);

    response.status(204);
  }
}

export = CGPPortfolioController;
