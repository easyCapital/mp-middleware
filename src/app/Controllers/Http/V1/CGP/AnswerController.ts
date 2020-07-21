import { Filters, Answer } from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class CGPAnswerController {
  public async search({ params, request, response, backendApi }: Context) {
    const { customer } = params;
    const filters = request.input('filters') as Filters;

    const answers = await backendApi.getCGPCustomerAnswers(customer, filters);

    response.status(200).send(answers);
  }

  public async create({ params, request, response, backendApi }: Context) {
    const { customer, study, contract } = params;
    const answers = request.post() as Answer[];

    await backendApi.createCGPAnswers(customer, answers, study, contract);

    response.status(201).send();
  }
}

export = CGPAnswerController;
