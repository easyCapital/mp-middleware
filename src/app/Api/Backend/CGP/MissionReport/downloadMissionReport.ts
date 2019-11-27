import { IncomingMessage, ServerResponse } from 'http';

// import { Exception } from '../../../../Exceptions';
// import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function downloadMissionReport(
  this: BackendApi,
  req: IncomingMessage,
  res: ServerResponse,
  propositionToken: string,
): Promise<any> {
  return this.backendClient.proxy(req, res, { url: `proposition/${propositionToken}/mission_report/cgp/download` });
}
