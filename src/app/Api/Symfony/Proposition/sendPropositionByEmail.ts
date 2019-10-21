const SymfonyClient = use('SymfonyClient');
const Logger = use('Logger');

export default async function sendPropositionByEmail(token: string): Promise<void> {
  const response = await SymfonyClient.post({ url: 'onboarding/recommendation/send' }, { token });
  if (response.ok) {
    Logger.info('Proposition %s sent by email through Symfony', token);
  } else {
    const data = await response.json();
    Logger.error('Symfony client returned an error while trying to send proposition %s by email: %s', token, data);
  }
}
