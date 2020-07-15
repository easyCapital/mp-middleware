import { Customer as JsonCustomerInterface } from '@robinfinance/js-api';

import Tag from './Tag';

interface CustomerInterface {
  toJSON(): JsonCustomerInterface;
  isActive(): boolean;
  isEmailValidated(): boolean;
}

export default class Customer implements CustomerInterface {
  private id: number;
  private email: string;
  private firstName?: string;
  private lastName?: string;
  private mobileNumber?: string;
  private active: boolean;
  private emailValidated: boolean;
  private activeTask?: string;
  private lastModified: string;
  private lastLogin?: string;
  private universe: string;
  private tags?: Tag[];

  constructor(json: any) {
    this.id = json.id;
    this.email = json.email;
    this.active = json.is_active;
    this.emailValidated = json.email_validated;
    this.lastModified = json.last_modified;
    this.lastLogin = json.last_login;
    this.universe = json.universe;

    if (json.customer_tags) {
      this.tags = json.customer_tags.map((tag) => new Tag(tag));
    }
  }

  public toJSON(): JsonCustomerInterface {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      mobileNumber: this.mobileNumber,
      isActive: this.active,
      activeTask: this.activeTask,
      lastModified: this.lastModified,
      lastLogin: this.lastLogin,
      universe: this.universe,
      tags: this.tags?.map((tag) => tag.toJSON()),
    };
  }

  public getId(): number {
    return this.id;
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
