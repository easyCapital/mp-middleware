import { Answer as JsonAnswerInterface } from '@robinfinance/js-api';

interface AnswerInterface {
  toJSON(): JsonAnswerInterface;
  getKey(): string;
  getValue(): string | string[];
  addValue(value: string): void;
}

export default class Answer implements AnswerInterface {
  private key: string;
  private value: string | string[];

  constructor(json: any) {
    this.key = json.question;
    this.value = json.value;
  }

  public toJSON(): JsonAnswerInterface {
    return { [this.key]: this.value };
  }

  public getKey() {
    return this.key;
  }

  public getValue() {
    return this.value;
  }

  public addValue(value: string | string[]) {
    this.value = Array.isArray(this.value)
      ? Array.isArray(value)
        ? [...this.value, ...value]
        : [...this.value, value]
      : Array.isArray(value)
      ? [this.value, ...value]
      : [this.value, value];
  }
}
