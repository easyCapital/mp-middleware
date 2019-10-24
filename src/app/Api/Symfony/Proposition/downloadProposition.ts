import { IncomingMessage, ServerResponse } from 'http';
import SymfonyApi from '..';

export default async function downloadProposition(
  this: SymfonyApi,
  req: IncomingMessage,
  res: ServerResponse,
  token: string,
): Promise<void> {
  const synfonyUrl = `onboarding/recommendation/download/${token}`;
  return this.symfonyClient.proxy(req, res, synfonyUrl);
}
