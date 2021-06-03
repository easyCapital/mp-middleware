import { Partner } from '../../../../Models/Partner';
import { Exception } from '../../../../Exceptions';
import BackendApi from '../..';

export default async function updatePartner(this: BackendApi, partner: number, products: number[]): Promise<Partner> {
  try {
    const response = await this.backendClient.patch(
      {
        url: `cgp/partner/${partner}/update`,
      },
      {
        products,
      },
    );

    const data = await response.json();

    return data;
  } catch (exception) {
    throw new Exception(exception);
  }
}
