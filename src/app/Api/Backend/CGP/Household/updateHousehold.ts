import { Exception } from '../../../../Exceptions';
import BackendApi from '../..';

export default async function updateHousehold(this: BackendApi, household: number, fields: any): Promise<any> {
  try {
    const response = await this.backendClient.patch(
      {
        url: `cgp/household/${household}/update`,
      },
      fields,
    );

    const data = await response.json();

    return data;
  } catch (exception: any) {
    throw new Exception(exception);
  }
}
