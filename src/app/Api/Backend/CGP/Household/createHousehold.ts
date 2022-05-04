import { CreateHouseholdDTO } from '@robinfinance/js-api';

import { Exception } from '../../../../Exceptions';
import { Household } from '../../../../Models/Household';
import { BackendException, HouseholdCreationException } from '../../Exceptions';
import BackendApi from '../..';

export default async function createHousehold(this: BackendApi, household: CreateHouseholdDTO): Promise<Household> {
  const formattedData: {
    name?: string;
    members: {
      email: string | null;
      is_main_contact?: boolean;
      answers: { question_id: string; value: string | number | null }[];
      customer_status: number | null | undefined;
    }[];
  } = { members: [] };

  if (household.name) {
    formattedData.name = household.name;
  }

  household.members.forEach((member) => {
    formattedData.members.push({
      email: member.email,
      is_main_contact: member.isMainContact,
      answers: member.answers.map((item) => ({ question_id: item.question, value: item.value })),
      customer_status: Number(member.customer_status),
    });
  });

  try {
    const response = await this.backendClient.post({ url: 'cgp/household/create' }, formattedData);
    const data = await response.json();

    const createdHousehold = new Household(data);

    if (household.tags.length > 0) {
      if (household.tags.length > 0) {
        try {
          const tags = await this.createTags(createdHousehold.id, household.tags);

          createdHousehold.tags = tags;
        } catch {
          // DON'T HANDLE CATCH
        }
      }
    }

    return createdHousehold;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const errors = await exception.json();

      if (errors.errors) {
        throw new HouseholdCreationException([errors.errors], [formattedData]);
      }

      throw new BackendException(errors);
    }

    throw new Exception(exception);
  }
}
