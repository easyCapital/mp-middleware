import { FileStatuses, FileStatus } from '@robinfinance/js-api';

const Logger = use('Logger');

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

export default class FileStatusMapper {
  public static transformValue(value: string): FileStatus | undefined {
    const mappedValue = FileStatusMapping[value];

    if (mappedValue) {
      return mappedValue;
    }

    Logger.info('Missing mapping value in %s for %s', 'FileStatusMapper', value);

    return undefined;
  }

  public static reverseTransform(value: FileStatus): string | undefined {
    const key = Object.keys(FileStatusMapping).find(item => FileStatusMapping[item] === value);

    if (key) {
      return key;
    }

    Logger.info('Missing reverse mapping value in %s for %s', 'FileStatusMapper', value);

    return undefined;
  }
}
