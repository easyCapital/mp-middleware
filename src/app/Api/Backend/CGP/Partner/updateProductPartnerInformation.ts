import { ProductPartner } from '../../../../Models/Partner';
import { Exception } from '../../../../Exceptions';
import BackendApi from '../..';

export default async function updateProductInformation(
  this: BackendApi,
  partner: number,
  product: number,
  field: { name: string; value: string },
): Promise<ProductPartner> {
  try {
    const response = await this.backendClient.patch(
      {
        url: `cgp/partner/${partner}/product/${product}/update`,
      },
      { [field.name]: field.value },
    );

    const data = await response.json();

    const productPartner = new ProductPartner(data);

    return productPartner;
  } catch (exception) {
    throw new Exception(exception);
  }
}
