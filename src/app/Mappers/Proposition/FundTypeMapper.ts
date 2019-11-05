import { FundTypes, FundType } from '@robinfinance/js-api';

const Logger = use('Logger');

const FundTypeMapping = {
  '1': FundTypes.FCPI,
  '2': FundTypes.FIP,
  '3': FundTypes.EURO,
  '4': FundTypes.UC,
  '5': FundTypes.SCPI,
  '6': FundTypes.PEA,
  '8': FundTypes.OPCI,
};

export default class FundTypeMapper {
  public static transformValue(value: string): FundType | null {
    const mappedValue = FundTypeMapping[value];

    if (mappedValue) {
      return mappedValue;
    }

    Logger.info('Missing mapping value in %s for %s', 'FundTypeMapper', value);

    return null;
  }
}
