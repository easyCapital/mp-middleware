import {
  Question as JsonQuestionInterface,
  Condition as JsonConditionInterface,
  Rule as JsonRuleInterface,
  InputType,
} from 'mieuxplacer-js-api';

import { Condition, Error, Option, Rule } from '.';

import { InputTypeMapper } from '../../Mappers/Onboarding';

interface QuestionInterface {
  toJson(): JsonQuestionInterface | null;
  getId(): string;
}

export default class Question implements QuestionInterface {
  private id: string;
  private label?: string;
  private type: InputType | null;
  private placeholder?: string;
  private required: boolean = false;
  private min?: number;
  private max?: number;
  private sensitive: boolean = false;
  private conditions?: Condition[];
  private rules?: Rule[];
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
    this.sensitive = json.sensitive;

    if (json.condition) {
      this.conditions = json.condition.split(' and ').map(condition => new Condition(condition));
    }

    if (json.rules) {
      this.rules = json.rules.split(' and ').map(condition => new Rule(condition));
    }

    if (json.answers) {
      this.options = json.answers.map(option => new Option(option));
    }

    if (json.errors) {
      this.errors = json.errors.map(errors => new Error(errors));
    }
  }

  public toJson(): JsonQuestionInterface | null {
    if (this.type) {
      const json: JsonQuestionInterface = {
        id: this.id,
        label: this.label || null,
        type: this.type,
        placeholder: this.placeholder || null,
        required: this.required,
        min: this.min || null,
        max: this.max || null,
        sensitive: this.sensitive,
        errors: [],
      };

      if (this.conditions) {
        const conditions: JsonConditionInterface[] = [];

        this.conditions.forEach(condition => {
          const jsonCondition = condition.toJson();

          if (jsonCondition) {
            conditions.push(jsonCondition);
          }
        });

        json.conditions = conditions;
      }

      if (this.rules) {
        const rules: JsonRuleInterface[] = [];

        this.rules.forEach(rule => {
          const jsonRule = rule.toJson();

          if (jsonRule) {
            rules.push(jsonRule);
          }
        });

        json.rules = rules;
      }

      if (this.options) {
        json.options = this.options.map(option => option.toJson());
      }

      this.errors.forEach(error => {
        const jsonError = error.toJson();

        if (jsonError) {
          json.errors.push(jsonError);
        }
      });

      return json;
    }

    return null;
  }

  public getId(): string {
    return this.id;
  }
}
