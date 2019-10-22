import { Context } from '../../../types';

const PHONE_NUMBER_KEY = 'mobile_number';
const FIRST_NAME_KEY = 'DQ7';
const LAST_NAME_KEY = 'DQ6';

async function onCustomerCreation(context: Context, data?: any) {
  const { backendApi } = context;

  if (data) {
    const { phoneNumber, firstName, lastName } = data;

    await backendApi.createAnswers({
      [PHONE_NUMBER_KEY]: phoneNumber,
      [FIRST_NAME_KEY]: firstName,
      [LAST_NAME_KEY]: lastName,
    });

    // const index = new CustomerIndex({
    //   type: '_doc',
    //   app,
    //   source,
    //   medium,
    //   campaign,
    //   universe,
    //   id: data.id,
    //   index: 'user_index',
    // });

    // await ElasticApi.createIndex(index);
  }
}

export default onCustomerCreation;
