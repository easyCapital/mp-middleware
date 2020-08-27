import { Agency as JsonAgencyInterface } from '@robinfinance/js-api';

interface AgencyInterface {
  toJSON(): JsonAgencyInterface;
}

export default class Answer implements AgencyInterface {
  private id: number;
  private name: string;
  private logo: string | null;
  private created: string;
  private updated: string;

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.logo = json.logo;
    this.created = json.created;
    this.updated = json.updated;
  }

  public toJSON(): JsonAgencyInterface {
    return {
      id: this.id,
      name: this.name,
      logo: this.logo,
      created: this.created,
      updated: this.updated,
    };
  }
}
