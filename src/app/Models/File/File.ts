import { File as JsonFileInterface, FileStatus, FileType } from '@robinfinance/js-api';

import { FileTypeMapper, FileStatusMapper } from '../../Mappers/File';

interface FileInterface {
  toJSON(): JsonFileInterface;
}

export default class File implements FileInterface {
  private id: number;
  private type?: FileType;
  private mimeType?: string;
  private status?: FileStatus;
  private signed: boolean;
  private updateDate: string;

  constructor(json: any) {
    this.id = json.id;
    this.type = FileTypeMapper.transformValue(json.type);
    this.mimeType = json.mime_type;
    this.status = FileStatusMapper.transformValue(json.status);
    this.signed = json.signed;
    this.updateDate = json.update_date;
  }

  public toJSON(): JsonFileInterface {
    return {
      id: this.id,
      type: this.type,
      mimeType: this.mimeType,
      status: this.status,
      signed: this.signed,
      updateDate: this.updateDate,
    };
  }

  public getType(): FileType | undefined {
    return this.type;
  }
}
