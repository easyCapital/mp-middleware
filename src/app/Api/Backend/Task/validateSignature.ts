import { Contract } from '../../../Models/Contract';
import { Exception } from '../../../Exceptions';
import { BackendException } from '../Exceptions';
import BackendApi from '..';

export default async function validateSignature(this: BackendApi, contractId: string): Promise<Contract> {
  try {
    await this.backendClient.get({
      url: `contract/${contractId}/customer/signed`,
    });

    const contract = await this.getContract(contractId);

    return contract;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
