import { Context } from '../../../../../types';

class CGPCustomerController {
  public async search({ request, response, backendApi }: Context) {
    const filters = request.input('filters');
    const pagination = request.input('pagination');

    const customers = await backendApi.searchCGPCustomer(filters, pagination);

    response.status(200).send(customers);
  }

  public async get({ params, response, backendApi }: Context) {
    const { id } = params;

    const customer = await backendApi.getCGPCustomer(id);

    response.status(200).send(customer);
  }
}

export = CGPCustomerController;
