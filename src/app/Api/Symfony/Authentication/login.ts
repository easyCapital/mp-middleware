import { Exception } from '../../../Exceptions';
import { AuthenticationException } from '../Exceptions';

const Config = use('Adonis/Src/Config');
const SymfonyClient = use('SymfonyClient');

export default async function login(email: string, password: string): Promise<string> {
  const response = await SymfonyClient.post({ url: 'auth/login' }, { email, password });

  if (!response.ok) {
    const data = await response.json();

    throw new AuthenticationException(data);
  }

  const cookies = response.headers.get('set-cookie');
  const sessionCookie = cookies.match(/MPSESSION=(\S*);/g);

  if (sessionCookie.length > 0) {
    const sessionKey = Config.get('clients.symfony.sessionKey');

    return sessionCookie[0].replace(`${sessionKey}=`, '').replace(';', '');
  }

  throw new Exception();
}
