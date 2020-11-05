import { CGP as JsonCGPInterface, Gender } from '@robinfinance/js-api';

import { CGPGenderMapper } from '../../Mappers/Customer';

interface CGPInterface {
  toJSON(): JsonCGPInterface;
}

export default class CGP implements CGPInterface {
  private id: number;
  private email: string;
  private firstName?: string;
  private lastName?: string;
  private gender?: Gender;
  private signature?: string;
  private universe: string;
  private firstLogin: boolean;
  private lastModified: string;
  private lastLogin?: string;

  constructor(json: any) {
    this.id = json.id;
    this.email = json.email;
    this.firstName = json.firstname;
    this.lastName = json.lastname;
    this.signature = json.signature;
    this.universe = json.universe;
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
      universe: this.universe,
      firstLogin: this.firstLogin,
      lastModified: this.lastModified,
      lastLogin: this.lastLogin,
    };
  }
}
