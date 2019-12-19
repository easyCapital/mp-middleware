import { Context } from '../../../types';

const PHONE_NUMBER_KEY = 'mobile_number';
const FIRST_NAME_KEY = 'DQ7';
const LAST_NAME_KEY = 'DQ6';

function onCustomerCreation(context: Context, data?: any) {
  const { backendApi } = context;

  if (data) {
    const { phoneNumber, firstName, lastName } = data;

    backendApi.createAnswers({
      [PHONE_NUMBER_KEY]: phoneNumber,
      [FIRST_NAME_KEY]: firstName,
      [LAST_NAME_KEY]: lastName,
    });
  }
}

export default onCustomerCreation;
