import { Filters } from '@robinfinance/js-api';

import { formatAnswers } from '../../../../Api/Backend/Helpers';
import { Answer } from '../../../../Models/Answer';
import { Context } from '../../../../../types';

class CGPAnswerController {
  public async search({ params, request, response, backendApi }: Context) {
    const { customer } = params;
    const filters = request.input('filters') as Filters;

    const answers: Answer[] = await backendApi.getCGPCustomerAnswers(customer, filters);

    response.status(200).send(formatAnswers(answers));
  }

  public async create({ params, request, response, backendApi }: Context) {
    const { customer, study } = params;
    const answers: any = request.post();

    await backendApi.createCGPAnswers(customer, answers, study);

    response.status(201).send();
  }
}

export = CGPAnswerController;
