import { Step as JsonStepInterface } from 'mieuxplacer-js-api';

import Block from './Block';

interface StepInterface {
  toJson(): JsonStepInterface;
}

export default class Step implements StepInterface {
  private id: string;
  private step: number;
  private title: string;
  private titleMobile: string;
  private blocks: Block[] = [];

  constructor(json: any) {
    this.id = json.id;
    this.step = Number(json.step);
    this.title = json.title;
    this.titleMobile = json.titleMobile;

    if (json.blocks) {
      this.blocks = json.blocks.map(block => new Block(block));
    }
  }

  public toJson(): JsonStepInterface {
    return {
      id: this.id,
      step: this.step,
      title: this.title,
      titleMobile: this.titleMobile,
      blocks: this.blocks.map(block => block.getId()),
    };
  }

  public getBlocks(): Block[] {
    return this.blocks;
  }
}
