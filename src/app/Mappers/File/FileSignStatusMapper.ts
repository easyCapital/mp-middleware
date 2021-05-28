import { FileSignStatuses } from '@robinfinance/js-api';

import GenericMapper from '../GenericMapper';

const FileSignStatusMapping = {
  '0': FileSignStatuses.TO_SIGN,
  '1': FileSignStatuses.WAITING_FOR_SIGNATURE,
  '2': FileSignStatuses.SIGNING,
  '3': FileSignStatuses.SIGNED,
  '4': FileSignStatuses.EXPIRED,
  '5': FileSignStatuses.CANCELED,
  '6': FileSignStatuses.REFUSED,
};

class FileSignStatusMapper extends GenericMapper<FileSignStatuses> {
  protected readonly mapping = FileSignStatusMapping;
}

export default new FileSignStatusMapper();
