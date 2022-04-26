import {
  AnalysisConclusion,
  Customer as JsonCustomerInterface,
  Gender,
  CustomerStatus,
  CustomerStatuses,
} from '@robinfinance/js-api';

import { AnalysisConclusionMapper } from '../../Mappers/Analysis';
import { CGPGenderMapper } from '../../Mappers/Customer';

interface CustomerInterface {
  toJSON(): JsonCustomerInterface;
}

export default class Customer implements CustomerInterface {
  public id: number;
  public household?: number;
  public email: string;
  public gender?: Gender;
  public firstName?: string;
  public lastName?: string;
  public mobileNumber?: string;
  public birthdate?: string;
  public universe: string;
  public active: boolean;
  public lastModified: string;
  public lastLogin?: string;
  public updatedRIC: string;
  public blacklisted?: AnalysisConclusion;
  public customerStatus: CustomerStatus;

  constructor(json: any) {
    this.id = json.id;
    this.household = json.my_household;
    this.email = json.email;
    this.firstName = json.first_name;
    this.lastName = json.last_name;
    this.mobileNumber = json.mobile_number;
    this.birthdate = json.birthdate;
    this.universe = json.universe;
    this.active = json.is_active;
    this.lastModified = json.last_modified;
    this.lastLogin = json.last_login;
    this.updatedRIC = json.updated_ric;
    this.customerStatus = json.customer_status;

    if (json.gender) {
      this.gender = CGPGenderMapper.transformValue(json.gender);
    }

    if (json.is_blacklisted !== null) {
      this.blacklisted = AnalysisConclusionMapper.transformValue(json.is_blacklisted);
    }

    switch (json.customer_status) {
      case 0:
        this.customerStatus === CustomerStatuses.NOT_SPECIFIED;
        break;
      case 1:
        this.customerStatus === CustomerStatuses.PROSPECT;
        break;
      case 2:
        this.customerStatus === CustomerStatuses.CLIENT;
        break;
    }
  }

  public toJSON(): JsonCustomerInterface {
    return {
      id: this.id,
      household: this.household,
      email: this.email,
      gender: this.gender,
      firstName: this.firstName,
      lastName: this.lastName,
      birthdate: this.birthdate,
      mobileNumber: this.mobileNumber,
      universe: this.universe,
      isActive: this.active,
      lastModified: this.lastModified,
      lastLogin: this.lastLogin,
      updatedRIC: this.updatedRIC,
      isBlacklisted: this.blacklisted,
      customerStatus: this.customerStatus,
    };
  }
}
