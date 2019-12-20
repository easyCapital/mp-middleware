import { File as JsonFileInterface, FileStatus, FileType } from '@robinfinance/js-api';

import { FileTypeMapper, FileStatusMapper } from '../../Mappers/File';

interface FileInterface {
  toJSON(): JsonFileInterface;
}

export default class File implements FileInterface {
  private id: number;
  private file: string;
  private type?: FileType;
  private status?: FileStatus;
  private signed: boolean;
  private updateDate: string;

  constructor(json: any) {
    this.id = json.id;
    this.file = json.file;
    this.type = FileTypeMapper.transformValue(json.type);
    this.status = FileStatusMapper.transformValue(json.status);
    this.signed = json.signed;
    this.updateDate = json.update_date;
  }

  public toJSON(): JsonFileInterface {
    return {
      id: this.id,
      file: this.file,
      type: this.type,
      status: this.status,
      signed: this.signed,
      updateDate: this.updateDate,
    };
  }
}
