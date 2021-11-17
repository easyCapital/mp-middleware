import { CreateHouseholdDTO } from '@robinfinance/js-api';

import { Exception } from '../../../../Exceptions';
import { BackendException, HouseholdPrevalidationException } from '../../Exceptions';
import BackendApi from '../..';

type BackendHouseholdDTO = {
  name?: string;
  members: {
    email: string | null;
    is_main_contact?: boolean;
    answers: { question_id: string; value: string | number | null }[];
  }[];
};

export default async function prevalidateHouseholds(this: BackendApi, households: CreateHouseholdDTO[]): Promise<void> {
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
    await this.backendClient.post({ url: 'cgp/household/pre_validate' }, formattedData);
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const errors = await exception.json();

      if (Array.isArray(errors)) {
        throw new HouseholdPrevalidationException(errors, formattedData);
      }

      throw new BackendException(errors);
    }

    throw new Exception(exception);
  }
}
