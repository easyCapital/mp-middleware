import { FileType } from '@robinfinance/js-api';

import { FileTypeMapper, FileTypeKeyMapper } from '../../../../Mappers/File';
import { Exception, NotFoundException } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getSignatureUrl(
  this: BackendApi,
  customerId: string,
  type: FileType,
  callbackUrl: string,
): Promise<{ url: string }> {
  const formattedType = FileTypeMapper.reverseTransform(type);

  if (formattedType) {
    const formattedTypeKey = FileTypeKeyMapper.reverseTransform(formattedType);

    if (formattedTypeKey) {
      try {
        const response = await this.backendClient.post(
          {
            url: `cgp/customer/${customerId}/file/${formattedTypeKey}/sign`,
          },
          { callback_url: callbackUrl },
        );

        const data = await response.json();

        if (data.signature_url) {
          return { url: data.signature_url };
        }
      } catch (exception) {
        if (typeof exception.json === 'function') {
          const error = await exception.json();

          throw new BackendException(error);
        }

        throw new Exception(exception);
      }
    }
  }

  throw new NotFoundException();
}
