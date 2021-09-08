import { Context } from '../../../types';

const PHONE_NUMBER_KEY = 'mobile_number';
const FIRST_NAME_KEY = 'DQ7';
const LAST_NAME_KEY = 'DQ6';

function onCustomerCreation(context: Context, data?: any): void {
  const { backendApi } = context;

  if (data) {
    const { phoneNumber, firstName, lastName } = data;

    backendApi.createAnswers([
      {
        question: PHONE_NUMBER_KEY,
        value: phoneNumber,
      },
      {
        question: FIRST_NAME_KEY,
        value: firstName,
      },
      {
        question: LAST_NAME_KEY,
        value: lastName,
      },
    ]);
  }
}

export default onCustomerCreation;
