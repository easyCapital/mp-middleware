import CustomerCreationException from '../Exceptions/CustomerCreationException';
import BackendApi from '..';

export default async function createCustomer(
  this: BackendApi,
  email: string,
  password: string,
  universe: string,
): Promise<{ id: string; token: string }> {
  try {
    const response = await this.backendClient.post({ url: 'customer/create' }, { email, password, universe });
    return await response.json();
  } catch (exception) {
    const data = await exception.json();

    throw new CustomerCreationException(data);
  }
}
