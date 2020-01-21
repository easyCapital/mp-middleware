import { FileType } from '@robinfinance/js-api';

import { File } from '../../../Models/File';
import { Exception, NotFoundException } from '../../../Exceptions';
import { FileTypeMapper, FileTypeKeyMapper } from '../../../Mappers/File';
import { FileException } from '../Exceptions';
import BackendApi from '..';

export default async function createFile(this: BackendApi, type: FileType, file: string): Promise<File> {
  const typeId = FileTypeMapper.reverseTransform(type);

  if (typeId) {
    const typeKey = FileTypeKeyMapper.reverseTransform(typeId);

    if (type) {
      try {
        const response = await this.backendClient.post(
          {
            url: 'file/customer/create',
          },
          { type_key: typeKey, file },
        );
        const data = await response.json();

        const createdFile = new File(data);

        return createdFile;
      } catch (exception) {
        if (typeof exception.json === 'function') {
          const error = await exception.json();

          throw new FileException(error);
        }

        throw new Exception(exception);
      }
    }
  }

  throw new NotFoundException();
}
