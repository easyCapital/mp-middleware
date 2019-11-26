import { File as JsonFileInterface, FileStatus, FileType } from '@robinfinance/js-api';

import { FileTypeMapper, FileStatusMapper } from '../../Mappers/File';

interface FileInterface {
  toJSON(): JsonFileInterface;
}

export default class File implements FileInterface {
  private id: number;
  private customer: number;
  private file: string;
  private type?: FileType;
  private status?: FileStatus;
  private contracts?: [number];
  private signed?: boolean;
  private uploadDate?: string;
  private updateDate?: string;

  constructor(json: any) {
    this.id = json.id;
    this.customer = json.user;
    this.file = json.file;
    this.type = FileTypeMapper.transformValue(json.type);
    this.status = FileStatusMapper.transformValue(json.status);
    this.contracts = json.contracts;
    this.signed = json.signed;
    this.uploadDate = json.updateDate;
    this.updateDate = json.updateDate;
  }

  public toJSON(): JsonFileInterface {
    return {
      id: this.id,
      customer: this.customer,
      file: this.file,
      type: this.type,
      status: this.status,
      contracts: this.contracts,
      signed: this.signed,
      uploadDate: this.uploadDate,
      updateDate: this.updateDate,
    };
  }
}
