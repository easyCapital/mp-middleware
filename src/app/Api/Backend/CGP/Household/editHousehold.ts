import { HouseholdDTO } from '@robinfinance/js-api';

import { Exception } from '../../../../Exceptions';
import { Household } from '../../../../Models/Household';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function editHousehold(
  this: BackendApi,
  householdId: string | number,
  household: HouseholdDTO,
): Promise<Household> {
  const formattedData: {
    name?: string;
    notes?: string;
    archived?: boolean;
    main_contact?: number;
    has_confict?: boolean;
  } = {};

  if (household.name !== undefined) {
    formattedData.name = household.name;
  }

  if (household.notes !== undefined) {
    formattedData.notes = household.notes;
  }

  if (household.archived !== undefined) {
    formattedData.archived = household.archived;
  }

  if (household.mainContact !== undefined) {
    formattedData.main_contact = household.mainContact;
  }

  if (household.hasConflict !== undefined) {
    formattedData.has_conflict = household.hasConflict;
  }

  try {
    const response = await this.backendClient.post({ url: `cgp/household/${householdId}/update` }, formattedData);

    const data = await response.json();

    return new Household(data);
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const errors = await exception.json();

      throw new BackendException(errors);
    }

    throw new Exception(exception);
  }
}
