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
  '20': FileTypes.LCB_FT,
  '21': FileTypes.CLIENT_DISCOVERY,
  '22': FileTypes.PRE_CONTRACT,
  '23': FileTypes.LCB_FT_RELATION_ENTRY,
  '24': FileTypes.MISSION_REPORT_ANNEX,
  '25': FileTypes.MISSION_REPORT_COMPLETED,
  '26': FileTypes.MISSION_REPORT_WITH_ANNEXES,
  '27': FileTypes.ASSET_FREEZING_BLACKLIST_REPORT,
  '28': FileTypes.RIC_PAPER_FORM,
  '29': FileTypes.RTO,
  '30': FileTypes.INVESTOR_PROFILE_PAPER_FORM,
};

class FileTypeMapper extends GenericMapper<FileTypes> {
  protected readonly mapping = FileTypeMapping;
}

export default new FileTypeMapper();
