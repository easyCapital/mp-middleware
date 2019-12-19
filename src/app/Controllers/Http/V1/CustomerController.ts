import { Context } from '../../../../types';
import InvalidArgumentException from '../../../Exceptions/InvalidArgumentException';
import { onCustomerCreation } from '../../../Listeners';

class CustomerController {
  public async get({ response, backendApi }: Context) {
    const customer = await backendApi.getCustomerDetails();

    response.status(200).send(customer);
  }

  public async create(context: Context) {
    const { request, response, session, backendApi, universe } = context;
    const { email, password, utmCampaign, utmSource, utmMedium, ...body }: any = request.post();

    if (!universe) {
      throw new InvalidArgumentException("L'entête MP-Universe est obligatoire.");
    }

    const data = await backendApi.createCustomer({
      email,
      password,
      universe,
      utm_campaign: utmCampaign,
      utm_source: utmSource,
      utm_medium: utmMedium,
    });

    context.updateToken({ customerToken: data.token });

    session.clear();

    await onCustomerCreation(context, body);

    response.status(200).send({ token: data.token });
  }
}

export = CustomerController;
