import { Signature } from '../../../../Models/File';
import { Exception } from '../../../../Exceptions';
import { SignatureException } from '../../Exceptions';
import BackendApi from '../..';

export default async function sendCustomerSignature(
  this: BackendApi,
  customerId: string,
  fileIds: number[] | string[],
  body?: { email?: string; subject?: string; message?: string },
): Promise<Signature | undefined> {
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

    const signature = new Signature(data);

    return signature;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new SignatureException(error);
    }

    throw new Exception(exception);
  }
}
