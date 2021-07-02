import { Exception } from '../../../../Exceptions';
import { ProductPartner } from '../../../../Models/Partner';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getProductPartnerInformation(
  this: BackendApi,
  partner: number | string,
  product: number | string,
): Promise<ProductPartner> {
  try {
    const response = await this.backendClient.get({
      url: `cgp/partner/${partner}/product/${product}`,
    });

    const data = await response.json();

    const productPartner = new ProductPartner(data);

    return productPartner;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
