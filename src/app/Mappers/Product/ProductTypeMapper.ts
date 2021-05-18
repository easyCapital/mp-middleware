import { ProductTypes } from '@robinfinance/js-api';

import GenericMapper from '../GenericMapper';

const ProductTypeMapping = {
  '0': ProductTypes.LIFE_INSURANCE,
  '2': ProductTypes.FIP,
  '3': ProductTypes.FCPI,
  '5': ProductTypes.SCPI,
  '6': ProductTypes.PEA,
  '7': ProductTypes.PERP,
  '8': ProductTypes.OPCI,
};

class ProductTypeMapper extends GenericMapper<ProductTypes> {
  protected readonly mapping = ProductTypeMapping;
}

export default new ProductTypeMapper();
