import { IncomingMessage, ServerResponse } from 'http';

import BackendApi from '../..';

export default async function exportHousehold(
  this: BackendApi,
  req: IncomingMessage,
  res: ServerResponse,
  id: string,
): Promise<any> {
  return this.backendClient.proxy(req, res, { url: `cgp/household/${id}/export_data` });
}
