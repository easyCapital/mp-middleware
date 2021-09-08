import { Exception } from '../../../../Exceptions';
import { CGP } from '../../../../Models/Customer';
import BackendApi from '../..';

export default async function setHasSeenHelp(this: BackendApi): Promise<CGP> {
  try {
    const response = await this.backendClient.patch({
      url: 'cgp/help',
    });

    const data = await response.json();

    const user = new CGP(data);

    return user;
  } catch (exception: any) {
    throw new Exception(exception);
  }
}
