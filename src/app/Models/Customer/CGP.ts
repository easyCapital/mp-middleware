import { CGP as JsonCGPInterface } from '@robinfinance/js-api';

interface CGPInterface {
  toJSON(): JsonCGPInterface;
}

export default class CGP implements CGPInterface {
  private id: number;
  private email: string;
  private firstName?: string;
  private lastName?: string;
  private CIF?: string;
  private orias?: string;
  private universe: string;
  private firstLogin: boolean;
  private lastModified: string;
  private lastLogin?: string;

  constructor(json: any) {
    this.id = json.id;
    this.email = json.email;
    this.firstName = json.firstname;
    this.lastName = json.lastname;
    this.CIF = json.CIF;
    this.orias = json.orias;
    this.universe = json.universe;
    this.firstLogin = json.first_login;
    this.lastModified = json.last_modified;
    this.lastLogin = json.last_login;
  }

  public toJSON(): JsonCGPInterface {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      CIF: this.CIF,
      orias: this.orias,
      universe: this.universe,
      firstLogin: this.firstLogin,
      lastModified: this.lastModified,
      lastLogin: this.lastLogin,
    };
  }
}
