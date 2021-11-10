import { FileTypes } from '@robinfinance/js-api';
import { IncomingMessage, ServerResponse } from 'http';

import BackendApi from '../../BackendApi';

export default async function downloadTemplateFile(
  this: BackendApi,
  req: IncomingMessage,
  res: ServerResponse,
  type: string,
  fileFormat?: string,
): Promise<FileTypes> {
  const querystring = fileFormat ? `?file_format=${fileFormat}` : '';
  return this.backendClient.proxy(req, res, {
    url: `file/cgp/template/download/${type}${querystring}`,
  });
}
