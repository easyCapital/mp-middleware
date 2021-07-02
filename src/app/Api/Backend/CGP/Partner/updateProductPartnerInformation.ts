import { Partner } from '../../../../Models/Partner';
import { Exception } from '../../../../Exceptions';
import BackendApi from '../..';

export default async function updateProductInformation(
  this: BackendApi,
  partner: number,
  product: number,
  field: { name: string; value: string },
): Promise<Partner> {
  try {
    const response = await this.backendClient.patch(
      {
        url: `cgp/partner/${partner}/product/${product}/update`,
      },
      { [field.name]: field.value },
    );

    const data = await response.json();

    return data;
  } catch (exception) {
    throw new Exception(exception);
  }
}
