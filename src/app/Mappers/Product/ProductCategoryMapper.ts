import { ProductCategoryTypes } from '@robinfinance/js-api';

import GenericMapper from '../GenericMapper';

const ProductCategoryMapping = {
  '0': ProductCategoryTypes.LIFE_INSURANCE,
  '2': ProductCategoryTypes.FIP,
  '3': ProductCategoryTypes.FCPI,
  '5': ProductCategoryTypes.SCPI,
  '6': ProductCategoryTypes.PEA,
  '7': ProductCategoryTypes.PERP,
  '8': ProductCategoryTypes.OPCI,
  '9': ProductCategoryTypes.LUXEMBOURG_LIFE_INSURANCE,
  '10': ProductCategoryTypes.CAPITALIZATION_CONTRACT,
  '11': ProductCategoryTypes.LUXEMBOURG_CAPITALIZATION_CONTRACT,
  '12': ProductCategoryTypes.GENERATION_LIFE,
  '13': ProductCategoryTypes.GIRARDIN,
  '14': ProductCategoryTypes.PER,
  '15': ProductCategoryTypes.SCPI_LAND_DEFICIT,
  '16': ProductCategoryTypes.TAX_SCPI,
  '17': ProductCategoryTypes.SPECIALIZED_SCPI,
};

class ProductCategoryMapper extends GenericMapper<ProductCategoryTypes> {
  protected readonly mapping = ProductCategoryMapping;
}

export default new ProductCategoryMapper();
