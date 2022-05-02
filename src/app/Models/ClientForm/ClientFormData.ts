import { ClientFormData as JsonClientFormDataInterface, Genders } from '@robinfinance/js-api';

interface ClientFormDataInterface {
  toJSON(): JsonClientFormDataInterface;
}

export default class ClientFormData implements ClientFormDataInterface {
  canBeFilled: boolean;
  completed: boolean;
  household: { id: number };
  mainContact: {
    id: number;
    gender: Genders;
    firstName: string;
    lastName: string;
  };
  secondaryContact?: {
    id: number;
    gender: Genders;
    firstName: string;
    lastName: string;
  };
  cgp: {
    id: number;
    gender: Genders;
    firstName: string;
    lastName: string;
    mail: string;
    phone: string;
  };
  agency: {
    id: number;
    name: string;
    logo: string;
  };

  constructor(json: any) {
    this.canBeFilled = json.can_be_filled;
    this.completed = json.completed;
    this.household = json.household;
    this.mainContact = {
      id: json.main_contact.id,
      gender: json.main_contact.gender,
      firstName: json.main_contact.first_name,
      lastName: json.main_contact.last_name,
    };

    this.cgp = {
      id: json.cgp.id,
      gender: json.cgp.gender,
      firstName: json.cgp.first_name,
      lastName: json.cgp.last_name,
      mail: json.cgp.mail,
      phone: json.cgp.phone,
    };
    this.agency = json.agency;

    if (json.secondary_contact) {
      this.secondaryContact = {
        id: json.secondary_contact.id,
        gender: json.secondary_contact.gender,
        firstName: json.secondary_contact.first_name,
        lastName: json.secondary_contact.last_name,
      };
    }
  }

  public toJSON(): JsonClientFormDataInterface {
    return {
      canBeFilled: this.canBeFilled,
      completed: this.completed,
      household: this.household,
      mainContact: this.mainContact,
      secondaryContact: this.secondaryContact,
      cgp: this.cgp,
      agency: this.agency,
    };
  }
}
