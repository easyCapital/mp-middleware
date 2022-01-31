import { Answer as JsonAnswerInterface } from '@robinfinance/js-api';

interface AnswerInterface {
  toJSON(): JsonAnswerInterface;
  getKey(): string;
  getValue(): string | null;
}

export default class Answer implements AnswerInterface {
  private question: string;
  private value: string | null;
  private user?: number;
  private household?: number;
  private row?: number;
  private table?: string;

  constructor(json: any) {
    this.question = json.question_id || json.question;
    this.value = json.value;
    this.user = json.user !== null ? json.user : undefined;
    this.household = json.household !== null ? json.household : undefined;
    this.row = json.row !== null ? json.row : undefined;
    this.table = json.table || undefined;
  }

  public toJSON(): JsonAnswerInterface {
    return {
      question: this.question,
      value: this.value,
      user: this.user,
      household: this.household,
      row: this.row,
      table: this.table,
    };
  }

  public getKey(): string {
    return this.question;
  }

  public getValue(): string | null {
    return this.value;
  }
}
