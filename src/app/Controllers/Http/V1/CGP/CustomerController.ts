import { Filters, Pagination, CustomerDTO } from '@robinfinance/js-api';

import InvalidArgumentException from '../../../../Exceptions/InvalidArgumentException';

import { Context } from '../../../../../types';

class CGPCustomerController {
  public async create({ request, response, backendApi, universe }: Context): Promise<void> {
    const { email, data: answers }: any = request.post();

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
      } catch {
        // DON'T HANDLE CATCH
      }
    }

    response.status(200).send({ id: data.id });
  }

  public async prevalidate({ request, response, backendApi }: Context): Promise<void> {
    const customers = request.post() as CustomerDTO[];

    try {
      await backendApi.prevalidateCustomers(customers);

      response.status(204);
    } catch (exception: any) {
      if (
        Array.isArray(exception.message) &&
        exception.message.filter((item) => Object.keys(item).length > 0).length > 0
      ) {
        response.status(400).send({ error: exception.message });
      }
    }
  }

  public async bulkCreate({ request, response, backendApi }: Context): Promise<void> {
    const customers = request.post() as CustomerDTO[];

    const data = await backendApi.createCGPCustomers(customers);

    response.status(201).send(data);
  }

  public async search({ request, response, backendApi }: Context): Promise<void> {
    const filters = request.input('filters') as Filters;
    const pagination = request.input('pagination') as Pagination;

    const customers = await backendApi.searchCGPCustomer(pagination, filters);

    response.status(200).send(customers);
  }

  public async get({ params, response, backendApi }: Context): Promise<void> {
    const { id } = params;

    const customer = await backendApi.getCGPCustomer(id);

    response.status(200).send(customer);
  }

  public async changeEmail({ params, request, response, backendApi }: Context): Promise<void> {
    const { id } = params;
    const { email }: any = request.post();

    const customer = await backendApi.changeCGPCustomerEmail(id, email);

    response.status(200).send(customer);
  }

  public async activate({ params, response, backendApi }: Context): Promise<void> {
    const { id } = params;

    await backendApi.activateCGPCustomer(id);

    const customer = await backendApi.getCGPCustomer(id);

    response.status(200).send(customer);
  }

  public async deactivate({ params, response, backendApi }: Context): Promise<void> {
    const { id } = params;

    await backendApi.deactivateCGPCustomer(id);

    const customer = await backendApi.getCGPCustomer(id);

    response.status(200).send(customer);
  }
}

export = CGPCustomerController;
