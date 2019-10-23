import { IncomingMessage, ServerResponse } from 'http';
const SymfonyClient = use('SymfonyClient');

export default async function downloadProposition(
  req: IncomingMessage,
  res: ServerResponse,
  token: string,
): Promise<void> {
  const synfonyUrl = `onboarding/recommendation/download/${token}`;
  return SymfonyClient.proxy(req, res, synfonyUrl);
}
