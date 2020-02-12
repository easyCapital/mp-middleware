import { IncomingMessage, ServerResponse } from 'http';
import { FileTypes } from '@robinfinance/js-api';

import BackendApi from '../..';

export default async function downloadTemplateFile(
  this: BackendApi,
  req: IncomingMessage,
  res: ServerResponse,
  type: FileTypes,
): Promise<any> {
  return this.backendClient.proxy(req, res, { url: `file/cgp/template/download/${type}` });
}
