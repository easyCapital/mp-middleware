import { IncomingMessage, ServerResponse } from 'http';

import BackendApi from '../..';

export default async function downloadCustomerFile(
  this: BackendApi,
  req: IncomingMessage,
  res: ServerResponse,
  fileId: string,
  type?: string,
): Promise<any> {
  if (type === 'pdf') {
    return this.backendClient.proxy(req, res, { url: `cgp/file/download/${fileId}/pdf` });
  }

  return this.backendClient.proxy(req, res, { url: `file/cgp/download/${fileId}` });
}
