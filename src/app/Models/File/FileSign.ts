import {
  FileSign as JsonFileSignInterface,
  FileStatus,
  FileType,
  FileSignStatus,
  FileSignType,
} from '@robinfinance/js-api';

import { FileTypeMapper, FileStatusMapper, FileSignStatusMapper, FileSignTypeMapper } from '../../Mappers/File';

interface FileInterface {
  toJSON(): JsonFileSignInterface;
}

export default class FileSign implements FileInterface {
  private id: number;
  private user?: {
    id: number;
    firstName?: string;
    lastName?: string;
  };
  private type?: FileType;
  private status?: FileStatus;
  private signatureStatus?: FileSignStatus;
  private signatureType?: FileSignType;
  private createDate?: string;
  private signDate?: string;

  constructor(json: any) {
    this.id = json.id;
    this.type = FileTypeMapper.transformValue(json.type);
    this.status = FileStatusMapper.transformValue(json.status);
    this.signDate = json.sign_date;

    if (json.user) {
      this.user = {
        id: json.user.id,
        firstName: json.user.first_name,
        lastName: json.user.last_name,
      };
    }

    if (json.signs && json.signs.length > 0) {
      const signature = json.signs[0];

      this.signatureStatus = FileSignStatusMapper.transformValue(signature.status);
      this.signatureType = FileSignTypeMapper.transformValue(signature.signature_type);
      this.createDate = signature.created;
    }
  }

  public toJSON(): JsonFileSignInterface {
    return {
      id: this.id,
      user: this.user,
      type: this.type,
      status: this.status,
      signatureStatus: this.signatureStatus,
      signatureType: this.signatureType,
      createDate: this.createDate,
      signDate: this.signDate,
    };
  }
}
