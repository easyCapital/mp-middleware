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
  '9': ProductTypes.LUXEMBOURG_LIFE_INSURANCE,
  '10': ProductTypes.CAPITALIZATION_CONTRACT,
  '11': ProductTypes.LUXEMBOURG_CAPITALIZATION_CONTRACT,
  '12': ProductTypes.GENERATION_LIFE,
  '13': ProductTypes.GIRARDIN,
  '14': ProductTypes.PER,
  '15': ProductTypes.SCPI_LAND_DEFICIT,
  '16': ProductTypes.TAX_SCPI,
  '17': ProductTypes.SPECIALIZED_SCPI,
};

class ProductTypeMapper extends GenericMapper<ProductTypes> {
  protected readonly mapping = ProductTypeMapping;
}

export default new ProductTypeMapper();
