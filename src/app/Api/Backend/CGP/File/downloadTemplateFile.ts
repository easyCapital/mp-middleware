import { IncomingMessage, ServerResponse } from 'http';
import { FileTypes } from '@robinfinance/js-api';

import { FileTypeMapper, FileTypeKeyMapper } from '../../../../Mappers/File';
import { NotFoundException } from '../../../../Exceptions';
import BackendApi from '../..';

export default async function downloadTemplateFile(
  this: BackendApi,
  req: IncomingMessage,
  res: ServerResponse,
  type: FileTypes,
): Promise<any> {
  const formattedType = FileTypeMapper.reverseTransform(type);

  if (formattedType) {
    const formattedTypeKey = FileTypeKeyMapper.reverseTransform(formattedType);

    if (formattedTypeKey) {
      return this.backendClient.proxy(req, res, { url: `file/cgp/template/download/${formattedTypeKey}` });
    }
  }

  throw new NotFoundException();
}
