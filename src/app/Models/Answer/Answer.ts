import { Answer as JsonAnswerInterface } from '@robinfinance/js-api';

interface AnswerInterface {
  toJSON(): JsonAnswerInterface;
  getKey(): string;
  getValue(): string | null;
}

export default class Answer implements AnswerInterface {
  private question: string;
  private value: string | null;
  private row?: number;

  constructor(json: any) {
    this.question = json.question_id || json.question;
    this.value = json.value;
    this.row = json.row !== null ? json.row : undefined;
  }

  public toJSON(): JsonAnswerInterface {
    return {
      question: this.question,
      value: this.value,
      row: this.row,
    };
  }

  public getKey() {
    return this.question;
  }

  public getValue() {
    return this.value;
  }
}
