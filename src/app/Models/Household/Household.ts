import { Household as JsonHouseholdInterface } from '@robinfinance/js-api';

import { Customer } from '../Customer';
import { Tag } from '../Tag';

interface HouseholdInterface {
  toJSON(): JsonHouseholdInterface;
}

export default class Household implements HouseholdInterface {
  public id: number;
  public name?: string;
  public notes?: string;
  public mainContact?: number;
  public archived: boolean;
  public members: Customer[] = [];
  public tags: Tag[] = [];
  public created: string;
  public updated: string;
  public hasConflict: boolean;

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.notes = json.notes;
    this.mainContact = json.main_contact;
    this.archived = json.archived;
    this.hasConflict = json.has_conflict;

    this.created = json.created;
    this.updated = json.updated;

    if (json.members) {
      this.members = json.members.map((member) => new Customer(member));
    }

    if (json.household_tags) {
      this.tags = json.household_tags.map((tag) => new Tag(tag));
    }
  }

  public toJSON(): JsonHouseholdInterface {
    return {
      id: this.id,
      name: this.name,
      notes: this.notes,
      mainContact: this.mainContact,
      archived: this.archived,
      created: this.created,
      updated: this.updated,
      members: this.members.map((member) => member.toJSON()),
      hasConflict: this.hasConflict,
      tags: this.tags.map((tag) => tag.toJSON()),
    };
  }
}
