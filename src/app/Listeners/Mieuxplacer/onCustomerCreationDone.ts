// import CustomerIndex from '../../Models/Elastic/CustomerIndex';
import BackendApi from '../../Api/Backend';
// import * as ElasticApi from '../../Api/Elastic';

const PHONE_NUMBER_KEY = 'mobile_number';
const FIRST_NAME_KEY = 'DQ7';
const LAST_NAME_KEY = 'DQ6';

async function onCustomerCreationDone(backendApi: BackendApi, data: { [key: string]: any }) {
  const { phoneNumber, firstName, lastName, app, source, medium, campaign, universe } = data;

  await backendApi.createAnswers({
    [PHONE_NUMBER_KEY]: phoneNumber,
    [FIRST_NAME_KEY]: firstName,
    [LAST_NAME_KEY]: lastName,
  });

  console.log(app, source, medium, campaign, universe);

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

export default onCustomerCreationDone;
