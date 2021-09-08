import { IncomingMessage, ServerResponse } from 'http';

import BackendApi from '../..';

export default async function downloadStudyFiles(
  this: BackendApi,
  req: IncomingMessage,
  res: ServerResponse,
  studyId: string,
): Promise<any> {
  return this.backendClient.proxy(req, res, { url: `cgp/study/${studyId}/files/download` });
}
