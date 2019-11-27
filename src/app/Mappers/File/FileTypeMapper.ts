import { FileTypes, FileType } from '@robinfinance/js-api';

const Logger = use('Logger');

const FileTypeMapping = {
  '0': FileTypes.UNKNOWN,
  '1': FileTypes.ID,
  '2': FileTypes.PASSPORT,
  '3': FileTypes.HOME_CERTIFICATE,
  '4': FileTypes.SUPPLIER_CONTRACT,
  '5': FileTypes.DIRECT_DEBIT_AUTHORIZATION,
  '6': FileTypes.RIB,
  '7': FileTypes.ID_VERSO,
  '8': FileTypes.FACE,
  '9': FileTypes.CREDIT_CARD,
  '10': FileTypes.TAXE,
  '11': FileTypes.MISSION_ORDER,
  '12': FileTypes.MISSION_REPORT,
  '13': FileTypes.HOST_ID,
  '14': FileTypes.HOST_ID_VERSO,
  '15': FileTypes.HOST_HEBERGEMENT_CERTIFICAT,
  '16': FileTypes.SUB_PEA_PORTFOLIO,
};

export default class FileTypeMapper {
  public static transformValue(value: string): FileType | undefined {
    const mappedValue = FileTypeMapping[value];

    if (mappedValue) {
      return mappedValue;
    }

    Logger.info('Missing mapping value in %s for %s', 'FileTypeMapper', value);

    return undefined;
  }

  public static reverseTransform(value: FileType): string | undefined {
    const key = Object.keys(FileTypeMapping).find(item => FileTypeMapping[item] === value);

    if (key) {
      return key;
    }

    Logger.info('Missing reverse mapping value in %s for %s', 'FileTypeMapper', value);

    return undefined;
  }
}
