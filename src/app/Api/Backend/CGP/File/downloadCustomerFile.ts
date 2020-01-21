import { IncomingMessage, ServerResponse } from 'http';

import BackendApi from '../..';

export default async function downloadCustomerFile(
  this: BackendApi,
  req: IncomingMessage,
  res: ServerResponse,
  fileId: string,
): Promise<any> {
  return this.backendClient.proxy(req, res, { url: `file/cgp/download/${fileId}` });
}
