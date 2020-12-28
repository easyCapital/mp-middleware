import { Agency as JsonAgencyInterface, Chamber } from '@robinfinance/js-api';

import { ChamberMapper } from '../../Mappers/Agency';

interface AgencyInterface {
  toJSON(): JsonAgencyInterface;
}

export default class Answer implements AgencyInterface {
  private id: number;
  private name: string;
  private logo: string | null;
  private chamber: Chamber | undefined;
  private created: string;
  private updated: string;

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.logo = json.logo;
    this.created = json.created;
    this.updated = json.updated;

    if (json.chamber) {
      this.chamber = ChamberMapper.transformValue(json.chamber);
    }
  }

  public toJSON(): JsonAgencyInterface {
    return {
      id: this.id,
      name: this.name,
      logo: this.logo,
      chamber: this.chamber,
      created: this.created,
      updated: this.updated,
    };
  }
}
