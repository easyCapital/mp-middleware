import { File as JsonFileInterface, FileStatus, FileType, FileSignStatus, FileSignType } from '@robinfinance/js-api';

import { FileTypeMapper, FileStatusMapper, FileSignStatusMapper, FileSignTypeMapper } from '../../Mappers/File';

interface FileInterface {
  toJSON(): JsonFileInterface;
}

export default class File implements FileInterface {
  private id: number;
  private user: number;
  private type?: FileType;
  private mimeType?: string;
  private size: number;
  private status?: FileStatus;
  private signed: boolean;
  private outdated: boolean;
  private archived: boolean;
  private signatureStatus?: FileSignStatus;
  private signatureType?: FileSignType;
  private updateDate: string;
  private createDate: string;
  private contracts?: number[];
  private studies?: number[];

  constructor(json: any) {
    this.id = json.id;
    this.user = json.user;
    this.type = FileTypeMapper.transformValue(json.type);
    this.mimeType = json.mime_type;
    this.size = json.size;
    this.status = FileStatusMapper.transformValue(json.status);
    this.contracts = json.contracts;
    this.signed = json.signed;
    this.outdated = json.outdated_infos;
    this.archived = json.archived;
    this.updateDate = json.update_date;
    this.createDate = json.upload_date;
    this.studies = json.studies;

    if (json.signature_status !== null) {
      this.signatureStatus = FileSignStatusMapper.transformValue(json.signature_status);
    }

    if (json.signature_type !== null) {
      this.signatureType = FileSignTypeMapper.transformValue(json.signature_type);
    }
  }

  public toJSON(): JsonFileInterface {
    return {
      id: this.id,
      user: this.user,
      type: this.type,
      mimeType: this.mimeType,
      size: this.size,
      status: this.status,
      signed: this.signed,
      outdated: this.outdated,
      archived: this.archived,
      signatureStatus: this.signatureStatus,
      signatureType: this.signatureType,
      updateDate: this.updateDate,
      createDate: this.createDate,
      contracts: this.contracts,
      studies: this.studies,
    };
  }

  public getType(): FileType | undefined {
    return this.type;
  }
}
