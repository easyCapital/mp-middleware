import { Customer as JsonCustomerInterface, Gender } from '@robinfinance/js-api';

import { CGPGenderMapper } from '../../Mappers/Customer';

import Tag from './Tag';

interface CustomerInterface {
  toJSON(): JsonCustomerInterface;
}

export default class Customer implements CustomerInterface {
  private id: number;
  private email: string;
  private gender?: Gender;
  private firstName?: string;
  private lastName?: string;
  private mobileNumber?: string;
  private universe: string;
  private active: boolean;
  private lastModified: string;
  private lastLogin?: string;
  private tags: Tag[] = [];

  constructor(json: any) {
    this.id = json.id;
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

    if (json.customer_tags) {
      this.tags = json.customer_tags.map((tag) => new Tag(tag));
    }
  }

  public toJSON(): JsonCustomerInterface {
    return {
      id: this.id,
      email: this.email,
      gender: this.gender,
      firstName: this.firstName,
      lastName: this.lastName,
      mobileNumber: this.mobileNumber,
      universe: this.universe,
      isActive: this.active,
      lastModified: this.lastModified,
      lastLogin: this.lastLogin,
      tags: this.tags.map((tag) => tag.toJSON()),
    };
  }
}
