import { Partner } from '../../../../Models/Partner';
import { Exception } from '../../../../Exceptions';
import BackendApi from '../..';

export default async function createPartner(this: BackendApi, supplier: number, products?: number[]): Promise<Partner> {
  const body: { supplier: number; products?: number[] } = { supplier };

  if (products) {
    body.products = products;
  }

  try {
    const response = await this.backendClient.post(
      {
        url: `cgp/partner/create`,
      },
      body,
    );

    const data = await response.json();

    const partner = new Partner(data);

    return partner;
  } catch (exception: any) {
    throw new Exception(exception);
  }
}
