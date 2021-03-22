import { FileSignTypes } from '@robinfinance/js-api';

import GenericMapper from '../GenericMapper';

const FileSignTypeMapping = {
  '0': FileSignTypes.UNKNOWN,
  '1': FileSignTypes.EMBEDDED,
  '2': FileSignTypes.DISTANT,
};

class FileSignTypeMapper extends GenericMapper<FileSignTypes> {
  protected readonly mapping = FileSignTypeMapping;
}

export default new FileSignTypeMapper();
