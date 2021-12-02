import { Signature } from '../../../../Models/File';
import { Exception } from '../../../../Exceptions';
import { SignatureException } from '../../Exceptions';
import BackendApi from '../..';

export default async function sendCustomerSignature(
  this: BackendApi,
  fileIds: number[] | string[],
  customers: { id: number; email?: string }[],
  subject?: string,
  message?: string,
  sendFilesToClient?: boolean,
): Promise<Signature | undefined> {
  const body: {
    files: number[] | string[];
    customers: { id: number; email?: string }[];
    subject?: string;
    message?: string;
    send_files_to_client?: boolean;
  } = {
    files: fileIds,
    customers,
  };

  if (subject) {
    body.subject = subject;
  }

  if (message) {
    body.message = message;
  }

  if (sendFilesToClient !== undefined) {
    body.send_files_to_client = sendFilesToClient;
  }

  try {
    const response = await this.backendClient.post(
      {
        url: `cgp/file/customer-sign`,
      },
      body,
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
