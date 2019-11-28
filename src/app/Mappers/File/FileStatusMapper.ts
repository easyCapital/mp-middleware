import { FileStatuses } from '@robinfinance/js-api';
import GenericMapper from '../GenericMapper';

const FileStatusMapping = {
  '0': FileStatuses.UNKNOWN,
  '1': FileStatuses.VALIDATION,
  '2': FileStatuses.VALID,
  '3': FileStatuses.INVALID,
  '4': FileStatuses.UNKOWN_TYPE,
  '5': FileStatuses.TO_SIGN,
  '6': FileStatuses.UNKNOWN_NAME,
  '7': FileStatuses.EXPIRED,
  '8': FileStatuses.UNREADABLE,
  '9': FileStatuses.WAITING_ANOTHER_DOCUMENT,
  '10': FileStatuses.SIGNING,
};

class FileStatusMapper extends GenericMapper<FileStatuses> {
  protected readonly mapping = FileStatusMapping;
}

export default new FileStatusMapper();
