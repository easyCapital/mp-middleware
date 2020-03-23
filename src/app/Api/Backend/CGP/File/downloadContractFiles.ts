import { IncomingMessage, ServerResponse } from 'http';

import BackendApi from '../..';

export default async function downloadContractFiles(
  this: BackendApi,
  req: IncomingMessage,
  res: ServerResponse,
  contractId: string,
): Promise<any> {
  return this.backendClient.proxy(req, res, { url: `cgp/contract/${contractId}/files/download` });
}
