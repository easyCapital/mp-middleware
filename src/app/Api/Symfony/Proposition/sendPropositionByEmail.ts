import SymfonyApi from '../SymfonyApi';

const Logger = use('Logger');

export default async function sendPropositionByEmail(this: SymfonyApi, token: string): Promise<void> {
  const response = await this.symfonyClient.post({ url: 'onboarding/recommendation/send' }, { token });
  if (response.ok) {
    Logger.info('Proposition %s sent by email through Symfony', token);
  } else {
    const data = await response.json();
    Logger.error('Symfony client returned an error while trying to send proposition %s by email: %s', token, data);
  }
}
