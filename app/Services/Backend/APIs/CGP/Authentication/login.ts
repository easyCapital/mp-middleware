import { Exception } from 'App/Exceptions';
import { BackendService } from 'App/Services';

import { AuthenticationException } from '../../../Exceptions';

export default async function login(
  this: BackendService,
  email: string,
  password: string,
): Promise<string> {
  try {
    const response = await this.client.post({ url: 'cgp/login' }, { email, password });

    const data = await response.json();

    return data.token;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      console.log(error);

      throw new AuthenticationException(error);
    }

    throw new Exception(exception);
  }
}
