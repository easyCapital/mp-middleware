import { Token } from 'mieuxplacer-js-api';

import { AuthenticationException } from '../Exceptions';
import BackendApi from '..';

export default async function login(this: BackendApi, email: string, password: string): Promise<Token> {
  try {
    const response = await this.backendClient.post({ url: 'customer/login' }, { email, password });
    return await response.json();
  } catch (exception) {
    const error = await exception.json();
    throw new AuthenticationException(error);
  }
}
