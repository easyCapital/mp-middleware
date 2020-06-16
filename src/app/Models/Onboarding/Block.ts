import { Block as JsonBlockInterface } from '@robinfinance/js-api';

interface BlockInterface {
  toJSON(): JsonBlockInterface;
  getId(): string;
  getLabel(): string;
}

export default class Block implements BlockInterface {
  private id: string;
  private label: string;
  private contextualHelpText?: string;
  private annotation?: string;
  private groupLabel?: string;
  private questions: string[];
  private showIfAuthenticated: boolean;
  private contextualHelpOpen: boolean;
  private isGroup: boolean;

  constructor(json: any) {
    this.id = json.id;
    this.label = json.label;
    this.contextualHelpText = json.contextualHelpText;
    this.annotation = json.annotation;
    this.groupLabel = json.group_label;
    this.questions = json.questions;
    this.showIfAuthenticated = json.showIfAuthenticated;
    this.contextualHelpOpen = json.contextualHelpOpen;
    this.isGroup = json.is_group;
  }

  public toJSON(): JsonBlockInterface {
    return {
      id: this.id,
      label: this.label,
      contextualHelpText: this.contextualHelpText || null,
      annotation: this.annotation || null,
      groupLabel: this.groupLabel || null,
      questions: this.questions,
      showIfAuthenticated: this.showIfAuthenticated,
      contextualHelpOpen: this.contextualHelpOpen,
      isGroup: this.isGroup,
    };
  }

  public getId(): string {
    return this.id;
  }

  public getLabel(): string {
    return this.label;
  }

  public getQuestions(): string[] {
    return this.questions;
  }
}
