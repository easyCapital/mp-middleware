import {
  Question as JsonQuestionInterface,
  InputType,
  Option as JsonOptionInterface,
} from 'mieuxplacer-js-api';

import Option from './Option';
import Error from './Error';

import { InputTypeMapper } from '../../Mappers/Onboarding';

interface QuestionInterface {
  toJson(): JsonQuestionInterface;
  getId(): string;
}

export default class Question implements QuestionInterface {
  private id: string;
  private label?: string;
  private type: InputType;
  private placeholder?: string;
  private required: boolean = false;
  private min?: number;
  private max?: number;
  private sensitive: boolean = false;
  private rules?: string;
  private options?: Option[];
  private errors: Error[] = [];

  constructor(json: any) {
    this.id = json.key;
    this.label = json.label;
    this.type = InputTypeMapper.transformValue(json.type);
    this.placeholder = json.placeholder;
    this.required = json.required;
    this.min = json.min;
    this.max = json.max;

    /**
     * Missing information in backend API
     */
    this.sensitive = json.sensitive;
    this.rules = json.rules;

    if (json.errors) {
      this.errors = json.errors.map(errors => new Error(errors));
    }

    if (json.options) {
      this.options = json.options.map(option => new Option(option));
    }
  }

  public toJson(): JsonQuestionInterface {
    const json: JsonQuestionInterface = {
      id: this.id,
      label: this.label || null,
      type: this.type,
      placeholder: this.placeholder || null,
      required: this.required,
      min: this.min || null,
      max: this.max || null,
      sensitive: this.sensitive,
      rules: this.rules || null,
      errors: this.errors.map(error => error.toJson()),
    };

    if (this.options) {
      json.options = this.options.map(option => option.toJson());
    }

    return json;
  }

  public getId(): string {
    return this.id;
  }
}
