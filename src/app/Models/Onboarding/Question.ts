import {
  Question as JsonQuestionInterface,
  Condition as JsonConditionInterface,
  InputType,
} from '@robinfinance/js-api';

import { Condition, Error, Option } from '.';

import { InputTypeMapper } from '../../Mappers/Onboarding';
import { NotFoundException } from '../../Mappers/Exceptions';

interface QuestionInterface {
  toJSON(): JsonQuestionInterface | null;
  getId(): string;
}

const Logger = use('Logger');

export default class Question implements QuestionInterface {
  private id: string;
  private label?: string;
  private type?: InputType;
  private placeholder?: string;
  private table?: string;
  private tableLabel?: string;
  private required = false;
  private min?: number;
  private max?: number;
  private sensitive = false;
  private active = false;
  private showIfAuthenticated = false;
  private isUsedByAlgo = false;
  private isForContract = false;
  private conditions?: Condition[][];
  private options?: Option[];
  private errors: Error[] = [];

  constructor(json: any) {
    this.id = json.key;
    this.label = json.label;
    this.placeholder = json.placeholder;
    this.table = json.table;
    this.tableLabel = json.table_label;
    this.required = json.required;
    this.min = json.min;
    this.max = json.max;
    this.sensitive = json.is_sensitive;
    this.active = json.is_active;
    this.showIfAuthenticated = json.show_if_authenticated;
    this.isUsedByAlgo = json.used_by_algo;
    this.isForContract = json.for_contract;

    try {
      this.type = InputTypeMapper.transformValue(json.input_type, true);
    } catch (exception: any) {
      if (exception instanceof NotFoundException) {
        Logger.info(`${exception.message} (question key : %s)`, this.id);
      }
    }

    if (json.condition) {
      this.conditions = json.condition
        .split(' or ')
        .map((condition) => condition.split(' and ').map((subCondition) => new Condition(subCondition)));
    }

    if (json.answers) {
      this.options = json.answers.map((option) => new Option(option));
    }

    if (json.errors) {
      this.errors = Object.keys(json.errors).map((type) => new Error(type, json.errors[type]));
    }
  }

  public findOption(value: string): Option | undefined {
    if (this.options) {
      return this.options.find((option) => option.value === value);
    }
  }

  public toJSON(): JsonQuestionInterface | null {
    if (this.type) {
      const json: JsonQuestionInterface = {
        id: this.id,
        label: this.label || null,
        type: this.type,
        placeholder: this.placeholder || null,
        table: this.table || null,
        tableLabel: this.tableLabel || null,
        required: this.required,
        min: this.min || null,
        max: this.max || null,
        sensitive: this.sensitive,
        active: this.active,
        showIfAuthenticated: this.showIfAuthenticated,
        isUsedByAlgo: this.isUsedByAlgo,
        isForContract: this.isForContract,
        errors: [],
      };

      if (this.conditions) {
        const conditions: JsonConditionInterface[][] = [];

        this.conditions.forEach((condition) => {
          const subConditions: JsonConditionInterface[] = [];

          condition.forEach((subCondition) => {
            const jsonCondition = subCondition.toJSON();

            if (jsonCondition) {
              subConditions.push(jsonCondition);
            }
          });

          if (subConditions.length > 0) {
            conditions.push(subConditions);
          }
        });

        json.conditions = conditions;
      }

      if (this.options) {
        json.options = this.options.map((option) => option.toJSON());
      }

      this.errors.forEach((error) => {
        const jsonError = error.toJSON();

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
