import { Customer as JsonCustomerInterface } from '@robinfinance/js-api';

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
  private activeTask?: string;
  private active: boolean;
  private emailValidated: boolean;
  private dateJoined: string;
  private lastModified: string;
  private universe: string;

  constructor(json: any) {
    this.id = json.id;
    this.email = json.email;
    this.active = json.is_active;
    this.emailValidated = json.email_validated;
    this.dateJoined = json.date_joined;
    this.lastModified = json.last_modified;
    this.universe = json.universe;
  }

  public toJSON(): JsonCustomerInterface {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      mobileNumber: this.mobileNumber,
      activeTask: this.activeTask,
      isActive: this.active,
      emailIsValidated: this.emailValidated,
      dateJoined: this.dateJoined,
      lastModified: this.lastModified,
      universe: this.universe,
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

  public isActive(): boolean {
    return this.active;
  }

  public isEmailValidated(): boolean {
    return this.emailValidated;
  }
}
