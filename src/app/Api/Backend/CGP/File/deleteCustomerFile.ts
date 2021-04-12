import { IncomingMessage, ServerResponse } from 'http';

import BackendApi from '../..';

export default async function deleteCustomerFile(
  this: BackendApi,
  req: IncomingMessage,
  res: ServerResponse,
  fileId: string,
  customerId: string,
): Promise<any> {
  return this.backendClient.proxy(req, res, { url: `cgp/customer/${customerId}/file/${fileId}/delete` });
}
