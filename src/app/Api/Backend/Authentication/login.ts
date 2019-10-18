import { Token } from 'mieuxplacer-js-api';

import { Customer } from '../../../Models/Customer';
import { AuthenticationException } from '../Exceptions';
import BackendApi from '..';

export default async function login(
  this: BackendApi,
  email: string,
  password: string,
): Promise<{ data: Token; customer: Customer }> {
  try {
    const response = await this.backendClient.post({ url: 'customer/login' }, { email, password });
    const data = await response.json();

    this.backendClient.setCustomerToken(data.token);

    const customer = await this.getCustomerDetails();

    return { data, customer };
  } catch (exception) {
    const error = await exception.json();

    throw new AuthenticationException(error);
  }
}
