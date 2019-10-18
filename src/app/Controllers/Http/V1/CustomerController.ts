import { Context } from '../../../../types';
import InvalidArgumentException from '../../../Exceptions/InvalidArgumentException';
import { onCustomerCreationDone } from '../../../Listeners';

class CustomerController {
  public async get({ response, backendApi }: Context) {
    const customer = await backendApi.getCustomerDetails();

    response.status(200).send(customer);
  }

  public async create({ request, response, backendApi, universe, app }: Context) {
    const { email, password, ...body }: any = request.post();

    if (!universe) {
      throw new InvalidArgumentException("L'entête MP-Universe est obligatoire.");
    }

    const data = await backendApi.createCustomer(email, password, universe);

    await onCustomerCreationDone(backendApi, app, { ...body, universe });

    response.status(200).send({ token: data.token });
  }
}

export = CustomerController;
