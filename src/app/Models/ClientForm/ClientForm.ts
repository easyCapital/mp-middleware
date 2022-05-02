import { Answer as IAnswer, ClientForm as JsonClientFormInterface, Household } from '@robinfinance/js-api';
import { Answer } from '../Answer';

interface ClientFormInterface {
  toJSON(): JsonClientFormInterface;
}

export default class ClientForm implements ClientFormInterface {
  uuid: number;
  household: Household;
  created: string;
  householdId: number;
  answers: IAnswer[];
  isActive: boolean;
  canBeFilled: boolean;
  completed: boolean;
  expirationDate: string;
  completionDate?: string;

  constructor(json: any) {
    this.uuid = json.uuid;
    this.household = json.household;
    this.created = json.created;
    this.householdId = json.household_id;

    this.isActive = json.is_active;
    this.canBeFilled = json.can_be_filled;
    this.completed = json.completed;
    this.expirationDate = json.expiration_date;

    if (json.data && json.data.length > 0) {
      this.answers = json.data.map((answer) => new Answer(answer));
    } else {
      this.answers = [];
    }

    if (json.completion_date) {
      this.completionDate = json.completion_date;
    }
  }

  public toJSON(): JsonClientFormInterface {
    return {
      uuid: this.uuid,
      household: this.household,
      householdId: this.householdId,
      created: this.created,
      answers: this.answers,
      isActive: this.isActive,
      canBeFilled: this.canBeFilled,
      completed: this.completed,
      expirationDate: this.expirationDate,
      completionDate: this.completionDate,
    };
  }
}
