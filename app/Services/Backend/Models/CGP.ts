import { CGP as JsonCGPInterface, Gender } from '@robinfinance/elwin-js';

import { CGPGenderMapper } from '../Mappers';

interface CGPContract {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  signature?: string;
  firstLogin: boolean;
  lastModified: string;
  lastLogin?: string;

  toJSON(): JsonCGPInterface;
}

export default class CGP implements CGPContract {
  public id: number;
  public email: string;
  public firstName?: string;
  public lastName?: string;
  public gender?: Gender;
  public signature?: string;
  public firstLogin: boolean;
  public lastModified: string;
  public lastLogin?: string;

  constructor(json: any) {
    this.id = json.id;
    this.email = json.email;
    this.firstName = json.firstname;
    this.lastName = json.lastname;
    this.signature = json.signature;
    this.firstLogin = json.first_login;
    this.lastModified = json.last_modified;
    this.lastLogin = json.last_login;

    if (json.cgp_gender) {
      this.gender = CGPGenderMapper.transformValue(json.cgp_gender);
    }
  }

  public toJSON(): JsonCGPInterface {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      signature: this.signature,
      firstLogin: this.firstLogin,
      lastModified: this.lastModified,
      lastLogin: this.lastLogin,
    };
  }
}
