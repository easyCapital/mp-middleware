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
  '28': ProductCategoryTypes.FIA,
  '29': ProductCategoryTypes.SOFICA,
  '30': ProductCategoryTypes.FPCI,
  '31': ProductCategoryTypes.OPPCI,
  '32': ProductCategoryTypes.MADELIN,
  '33': ProductCategoryTypes.FPS,
  '34': ProductCategoryTypes.DEMEMBREMENT,
  '35': ProductCategoryTypes.PEE,
  '36': ProductCategoryTypes.PEI,
  '37': ProductCategoryTypes.PERECO,
  '38': ProductCategoryTypes.REAL_ESTATE_FUNDS,
  '39': ProductCategoryTypes.BOND_LOAN,
  '40': ProductCategoryTypes.SIMPLE_UNLISTED_BONDS,
  '41': ProductCategoryTypes.SOCIAL_SHARES,
  '42': ProductCategoryTypes.PROVIDENCE,
  '43': ProductCategoryTypes.SCIC,
  '44': ProductCategoryTypes.GFV,
  '45': ProductCategoryTypes.SCI,
};

class ProductCategoryMapper extends GenericMapper<ProductCategoryTypes> {
  protected readonly mapping = ProductCategoryMapping;
}

export default new ProductCategoryMapper();
