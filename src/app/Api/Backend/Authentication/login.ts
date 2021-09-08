import { Token } from '@robinfinance/js-api';

import { Exception } from '../../../Exceptions';
import { AuthenticationException } from '../Exceptions';
import BackendApi from '..';

export default async function login(this: BackendApi, email: string, password: string): Promise<Token> {
  try {
    const response = await this.backendClient.post({ url: `customer/login` }, { email, password });

    const data: Token = await response.json();

    return data;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new AuthenticationException(error);
    }

    throw new Exception(exception);
  }
}
