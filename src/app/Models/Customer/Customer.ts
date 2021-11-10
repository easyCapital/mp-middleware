import { Customer as JsonCustomerInterface, Gender } from '@robinfinance/js-api';

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
  public universe: string;
  public active: boolean;
  public lastModified: string;
  public lastLogin?: string;

  constructor(json: any) {
    this.id = json.id;
    this.household = json.my_household;
    this.email = json.email;
    this.firstName = json.first_name;
    this.lastName = json.last_name;
    this.mobileNumber = json.mobile_number;
    this.universe = json.universe;
    this.active = json.is_active;
    this.lastModified = json.last_modified;
    this.lastLogin = json.last_login;

    if (json.gender) {
      this.gender = CGPGenderMapper.transformValue(json.gender);
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
      mobileNumber: this.mobileNumber,
      universe: this.universe,
      isActive: this.active,
      lastModified: this.lastModified,
      lastLogin: this.lastLogin,
    };
  }
}
