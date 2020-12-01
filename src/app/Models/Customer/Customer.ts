import { Customer as JsonCustomerInterface, Gender } from '@robinfinance/js-api';

import Tag from './Tag';

interface CustomerInterface {
  toJSON(): JsonCustomerInterface;
  isActive(): boolean;
  isEmailValidated(): boolean;
}

export default class Customer implements CustomerInterface {
  private id: number;
  private email: string;
  private gender?: Gender;
  private firstName?: string;
  private lastName?: string;
  private mobileNumber?: string;
  private universe: string;
  private activeTask?: string;
  private active: boolean;
  private emailValidated: boolean;
  private lastModified: string;
  private lastLogin?: string;
  private tags?: Tag[];

  constructor(json: any) {
    this.id = json.id;
    this.email = json.email;
    this.universe = json.universe;
    this.active = json.is_active;
    this.emailValidated = json.email_validated;
    this.lastModified = json.last_modified;
    this.lastLogin = json.last_login;

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
      activeTask: this.activeTask,
      isActive: this.active,
      lastModified: this.lastModified,
      lastLogin: this.lastLogin,
      tags: this.tags?.map((tag) => tag.toJSON()),
    };
  }

  public getId(): number {
    return this.id;
  }

  public setGender(gender: Gender): this {
    this.gender = gender;

    return this;
  }

  public setFirstName(firstName: string): this {
    this.firstName = firstName;

    return this;
  }

  public setLastName(lastName: string): this {
    this.lastName = lastName;

    return this;
  }

  public setMobileNumber(mobileNumber: string): this {
    this.mobileNumber = mobileNumber;

    return this;
  }

  public setActiveTask(label: string): this {
    this.activeTask = label;

    return this;
  }

  public setTags(tags: Tag[]): this {
    this.tags = tags;

    return this;
  }

  public isActive(): boolean {
    return this.active;
  }

  public isEmailValidated(): boolean {
    return this.emailValidated;
  }
}
