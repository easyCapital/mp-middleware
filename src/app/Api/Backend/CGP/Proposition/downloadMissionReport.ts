import { IncomingMessage, ServerResponse } from 'http';

import BackendApi from '../..';

export default async function downloadMissionReport(
  this: BackendApi,
  req: IncomingMessage,
  res: ServerResponse,
  propositionId: string,
): Promise<any> {
  return this.backendClient.proxy(req, res, { url: `proposition/${propositionId}/mission_report/cgp/download` });
}
