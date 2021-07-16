import { Signature as JsonSignatureInterface, FileSignStatus, FileSignType } from '@robinfinance/js-api';

import { FileSignStatusMapper, FileSignTypeMapper } from '../../Mappers/File';
import File from './File';

interface SignatureInterface {
  toJSON(): JsonSignatureInterface;
}

export default class Signature implements SignatureInterface {
  private id: number;
  private status?: FileSignStatus;
  private type?: FileSignType;
  private url: string;
  private created: string;
  private updated: string;
  private files: File[];

  constructor(json: any) {
    this.id = json.id;
    this.status = FileSignStatusMapper.transformValue(json.status);
    this.type = FileSignTypeMapper.transformValue(json.signature_type);
    this.url = json.signature_url;
    this.created = json.created;
    this.updated = json.updated;

    this.files = json.files.map((item) => new File(item));
  }

  public toJSON(): JsonSignatureInterface {
    return {
      id: this.id,
      status: this.status,
      type: this.type,
      url: this.url,
      created: this.created,
      updated: this.updated,
      files: this.files.map((item) => item.toJSON()),
    };
  }
}
