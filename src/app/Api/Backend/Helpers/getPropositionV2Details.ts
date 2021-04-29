import { ArrayToObject } from '../../../Helpers';
import { Product } from '../../../Models/Prismic';
import { findProducts } from '../../Prismic';
import BackendApi from '..';
import { PropositionV2 } from '../../../Models/PropositionV2';

const Logger = use('Logger');

export default async function getPropositionDetails(_backendApi: BackendApi, data: any): Promise<PropositionV2> {
  const proposition = new PropositionV2(data);

  if (data.contents && data.contents.length > 0) {
    const portfolioProducts = data.contents.map((content: any) => content.product_identifier);

    const [products] = await Promise.all([findProducts({ backend_key: portfolioProducts })]);

    const productsById: { [id: string]: Product } = ArrayToObject(products, 'identifier');

    const contentsWithProductsDetails: { product: Product; amount: any }[] = [];

    data.contents.forEach((item: any) => {
      const product = productsById[item.product_identifier];

      // contentsWithProductsDetails.push(product);
      contentsWithProductsDetails.push({ product, amount: item.amount });

      if (!product) {
        Logger.warning('Product with identifier %s could not be found in Prismic', item.product_identifier);
      }
    });
    proposition.setContents(contentsWithProductsDetails);
  }

  return proposition;
}
