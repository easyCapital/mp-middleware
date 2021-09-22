import { Filters, OrderBy } from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class CGPAnalysisController {
  public async search({ request, response, backendApi }: Context): Promise<void> {
    const filters = request.input('filters') as Filters | undefined;
    const orderBy = request.input('orderBy') as OrderBy | undefined;

    const data = await backendApi.searchCGPAnalysis(filters, orderBy);

    response.status(200).send(data);
  }

  public async generate({ params, response, backendApi }: Context): Promise<void> {
    const { id } = params;

    const data = await backendApi.generateCGPCustomerAnalysis(id);

    response.status(201).send(data);
  }

  public async valid({ params, request, response, backendApi }: Context): Promise<void> {
    const { id } = params;

    const { comment }: any = request.post() as { comment: string };

    const data = await backendApi.setCGPCustomerValidAnalysis(id, comment);

    response.status(201).send(data);
  }
}

export = CGPAnalysisController;
