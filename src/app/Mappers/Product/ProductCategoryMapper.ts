import { ProductCategoryTypes } from '@robinfinance/js-api';

import GenericMapper from '../GenericMapper';

const ProductCategoryMapping = {
  '0': ProductCategoryTypes.LIFE_INSURANCE,
  '1': ProductCategoryTypes.TRADING_ACCOUNT,
  '2': ProductCategoryTypes.FIP,
  '3': ProductCategoryTypes.FCPI,
  '4': ProductCategoryTypes.WALLET,
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
  '18': ProductCategoryTypes.TONTINE,
  '19': ProductCategoryTypes.LODEOM_EXONERATION,
  '20': ProductCategoryTypes.AGRICULTURAL_GIRARDIN,
  '21': ProductCategoryTypes.WINE_INVESTMENT,
  '22': ProductCategoryTypes.FORESTRY_INVESTMENT,
  '23': ProductCategoryTypes.BORROWER_INSURANCE,
  '24': ProductCategoryTypes.EMPLOYEE_SAVINGS,
  '25': ProductCategoryTypes.CROWDFUNDING,
  '26': ProductCategoryTypes.REAL_ESTATE_CROWDFUNDING,
  '27': ProductCategoryTypes.FCPR,
};

class ProductCategoryMapper extends GenericMapper<ProductCategoryTypes> {
  protected readonly mapping = ProductCategoryMapping;
}

export default new ProductCategoryMapper();
