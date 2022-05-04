import { MemberDTO } from '@robinfinance/js-api';

import { Exception } from '../../../../Exceptions';
import { Household } from '../../../../Models/Household';
import { BackendException, HouseholdAddMemberException } from '../../Exceptions';
import BackendApi from '../..';

export default async function createHouseholdMember(
  this: BackendApi,
  householdId: string | number,
  member: MemberDTO,
): Promise<Household> {
  const formattedData: {
    email: string | null;
    answers: { question_id: string; value: string | number | null }[];
    customer_status: number;
  } = {
    email: member.email,
    answers: member.answers.map((item) => ({ question_id: item.question, value: item.value })),
    customer_status: Number(member.customer_status),
  };

  try {
    const response = await this.backendClient.post(
      { url: `cgp/household/${householdId}/customer/create` },
      formattedData,
    );

    const data = await response.json();

    const household = new Household(data);

    if (member.isMainContact) {
      const secondaryMember = household.members.find((item) => item.id !== household.mainContact);

      if (secondaryMember) {
        const updatedHousehold = await this.editHousehold(householdId, { mainContact: secondaryMember.id });

        return updatedHousehold;
      }
    }

    return household;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const errors = await exception.json();

      if (errors.errors) {
        throw new HouseholdAddMemberException(errors.errors, formattedData);
      }

      throw new BackendException(errors);
    }

    throw new Exception(exception);
  }
}
