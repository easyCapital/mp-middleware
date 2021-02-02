import { Filters, Pagination } from '@robinfinance/js-api';
import InvalidArgumentException from '../../../../Exceptions/InvalidArgumentException';

import { Context } from '../../../../../types';

class CGPCustomerController {
  public async create({ request, response, backendApi, universe }: Context) {
    const { email, tags, data: answers }: any = request.post();

    if (!universe) {
      throw new InvalidArgumentException("L'entête MP-Universe est obligatoire.");
    }

    if (answers && answers.length > 0) {
      await backendApi.prevalidateAnswers(answers);
    }

    const data = await backendApi.createCGPCustomer(email, universe);

    if (answers && answers.length > 0) {
      try {
        await backendApi.createCGPCustomerAnswers(data.id, answers);
      } catch {}
    }

    if (tags && tags.length > 0) {
      try {
        await backendApi.createCGPCustomerTags(data.id, tags);
      } catch {}
    }

    response.status(200).send({ id: data.id });
  }

  public async search({ request, response, backendApi }: Context) {
    const filters = request.input('filters') as Filters;
    const pagination = request.input('pagination') as Pagination;

    const customers = await backendApi.searchCGPCustomer(pagination, filters);

    response.status(200).send(customers);
  }

  public async get({ params, response, backendApi }: Context) {
    const { id } = params;

    const customer = await backendApi.getCGPCustomer(id);

    response.status(200).send(customer);
  }

  public async changeEmail({ params, request, response, backendApi }: Context) {
    const { id } = params;
    const { email }: any = request.post();

    const customer = await backendApi.changeCGPCustomerEmail(id, email);

    response.status(200).send(customer);
  }

  public async deactivate({ params, response, backendApi }: Context) {
    const { id } = params;

    await backendApi.deactivateCGPCustomer(id);

    const customer = await backendApi.getCGPCustomer(id);

    response.status(200).send(customer);
  }
}

export = CGPCustomerController;
