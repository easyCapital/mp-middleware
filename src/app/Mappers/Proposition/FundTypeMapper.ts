import { FundTypes } from '@robinfinance/js-api';
import GenericMapper from '../GenericMapper';

const FundTypeMapping = {
  '1': FundTypes.FCPI,
  '2': FundTypes.FIP,
  '3': FundTypes.EURO,
  '4': FundTypes.UC,
  '5': FundTypes.SCPI,
  '6': FundTypes.PEA,
  '8': FundTypes.OPCI,
  '9': FundTypes.DELEGATED,
};

class FundTypeMapper extends GenericMapper<FundTypes> {
  protected readonly mapping = FundTypeMapping;
}

export default new FundTypeMapper();
