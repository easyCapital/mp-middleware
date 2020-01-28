import { Filters } from '@robinfinance/js-api';

import { Study } from '../../../../Models/Study';
import { Context } from '../../../../../types';

class CGPStudyController {
  public async create({ params, request, response, backendApi }: Context) {
    const { customer } = params;
    const data: any = request.post();

    const contracts = await backendApi.createCGPStudy(customer, data.title);

    response.status(201).send(contracts);
  }

  public async search({ params, request, response, backendApi }: Context) {
    const { customer } = params;
    const filters = request.input('filters') as Filters;

    const studies: Study[] = await backendApi.getCGPCustomerStudies(customer, filters);

    response.status(200).send(studies);
  }
}

export = CGPStudyController;
