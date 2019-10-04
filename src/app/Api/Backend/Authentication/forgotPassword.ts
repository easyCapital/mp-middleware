import { AuthenticationException } from '../Exceptions';

const BackendClient = use('BackendClient');

export default async function forgotPassword(email: string) {
  const response = await BackendClient.post({ url: 'customer/password/reset' }, { email });

  if (!response.ok) {
    const data = await response.json();

    throw new AuthenticationException(data);
  }
}
