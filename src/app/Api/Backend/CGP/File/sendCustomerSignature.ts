import { Exception, NotFoundException } from '../../../../Exceptions';
import { SignatureException } from '../../Exceptions';
import BackendApi from '../..';

export default async function sendCustomerSignature(
  this: BackendApi,
  customerId: string,
  fileIds: number[] | string[],
  body?: { email?: string; subject?: string; message?: string },
): Promise<{ url: string }> {
  try {
    const response = await this.backendClient.post(
      {
        url: `cgp/customer/${customerId}/file/customer-sign`,
      },
      {
        files: fileIds,
        ...body,
      },
    );

    const data = await response.json();

    if (data.signature_url) {
      return { url: data.signature_url };
    }
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new SignatureException(error);
    }

    throw new Exception(exception);
  }

  throw new NotFoundException();
}
