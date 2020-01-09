import { FileTypes } from '@robinfinance/js-api';

import GenericMapper from '../GenericMapper';

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
  '17': FileTypes.DER,
};

class FileTypeMapper extends GenericMapper<FileTypes> {
  protected readonly mapping = FileTypeMapping;
}

export default new FileTypeMapper();
