import { CreateHouseholdDTO } from '@robinfinance/js-api';

import { Exception } from '../../../../Exceptions';
import { Household } from '../../../../Models/Household';
import { BackendException, HouseholdCreationException } from '../../Exceptions';
import BackendApi from '../..';

type BackendHouseholdDTO = {
  name?: string;
  members: {
    email: string | null;
    is_main_contact?: boolean;
    answers: { question_id: string; value: string | number | null }[];
  }[];
};

export default async function createHouseholds(
  this: BackendApi,
  households: CreateHouseholdDTO[],
): Promise<Household[]> {
  const formattedData: BackendHouseholdDTO[] = [];

  households.forEach((household) => {
    const formattedHouseholdData: BackendHouseholdDTO = { members: [] };

    if (household.name) {
      formattedHouseholdData.name = household.name;
    }

    household.members.forEach((member) => {
      formattedHouseholdData.members.push({
        email: member.email,
        is_main_contact: member.isMainContact,
        answers: member.answers.map((item) => ({ question_id: item.question, value: item.value })),
      });
    });

    formattedData.push(formattedHouseholdData);
  });

  try {
    const response = await this.backendClient.post({ url: 'cgp/household/bulk_create' }, formattedData);
    const data = await response.json();

    return data.map((item) => new Household(item));
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const errors = await exception.json();

      if (Array.isArray(errors)) {
        throw new HouseholdCreationException(errors, formattedData);
      }

      throw new BackendException(errors);
    }

    throw new Exception(exception);
  }
}
