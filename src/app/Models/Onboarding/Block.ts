import { Block as JsonBlockInterface } from 'mieuxplacer-js-api';

interface BlockInterface {
  toJson(): JsonBlockInterface;
  getId(): string;
  getLabel(): string;
}

export default class Block implements BlockInterface {
  private id: string;
  private label: string;
  private showIfAuthenticated: boolean;
  private contextualHelpOpen: boolean;
  private contextualHelpText?: string;
  private annotation?: string;

  constructor(json: any) {
    this.id = json.id;
    this.label = json.label;
    this.showIfAuthenticated = json.showIfAuthenticated;
    this.contextualHelpOpen = json.contextualHelpOpen;
    this.contextualHelpText = json.contextualHelpText;
    this.annotation = json.annotation;
  }

  public toJson(): JsonBlockInterface {
    return {
      id: this.id,
      label: this.label,
      showIfAuthenticated: this.showIfAuthenticated,
      contextualHelpOpen: this.contextualHelpOpen,
      contextualHelpText: this.contextualHelpText || null,
      annotation: this.annotation || null,
    };
  }

  public getId(): string {
    return this.id;
  }

  public getLabel(): string {
    return this.label;
  }
}
