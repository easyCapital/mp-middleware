import { Customer as JsonCustomerInterface } from '@robinfinance/js-api';

interface CustomerInterface {
  toJSON(): JsonCustomerInterface;
  isActive(): boolean;
  isEmailValidated(): boolean;
}

export default class Customer implements CustomerInterface {
  private id: number;
  private email: string;
  private active: boolean;
  private emailValidated: boolean;
  private universe: string;

  constructor(json: any) {
    this.id = json.id;
    this.email = json.email;
    this.active = json.is_active;
    this.emailValidated = json.email_validated;
    this.universe = json.universe;
  }

  public toJSON(): JsonCustomerInterface {
    return {
      id: this.id,
      email: this.email,
      isActive: this.active,
      emailIsValidated: this.emailValidated,
      universe: this.universe,
    };
  }

  public isActive(): boolean {
    return this.active;
  }

  public isEmailValidated(): boolean {
    return this.emailValidated;
  }
}
