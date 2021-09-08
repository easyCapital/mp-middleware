import ProductCategoryFactSheet from '../../../../Models/Product/ProductCategoryFactSheet';
import { Exception } from '../../../../Exceptions';
import BackendApi from '../..';

export default async function updateProductCategoryFactSheet(
  this: BackendApi,
  category: number | string,
  field: { name: string; value: string },
): Promise<ProductCategoryFactSheet> {
  try {
    const response = await this.backendClient.patch(
      {
        url: `cgp/product_categories_fact_sheets/${category}/update`,
      },
      { [field.name]: field.value },
    );

    const data = await response.json();

    const updatedCategory = new ProductCategoryFactSheet(data);

    return updatedCategory;
  } catch (exception: any) {
    throw new Exception(exception);
  }
}
