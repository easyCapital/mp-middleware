import { Customer } from '../../../../Models/Customer';
import { Exception, NotFoundException } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getCustomer(this: BackendApi, id: string): Promise<Customer> {
  try {
    const response = await this.backendClient.get({
      url: 'customer/cgp/search',
      filters: { id },
      pagination: { page: 1, perPage: 1 },
    });
    const data = await response.json();

    if (data.length > 0) {
      const customer = new Customer(data[0]);

      const answers = await this.getCGPCustomerAnswers(
        customer.getId().toString(),
        {
          question_id__in: ['DQ7', 'DQ6', 'mobile_number'],
          is_active: 'True',
        },
        'question_id',
      );

      answers.forEach(answer => {
        if (answer.getKey() === 'DQ7') {
          customer.setFirstName(answer.getValue() as string);
        }

        if (answer.getKey() === 'DQ6') {
          customer.setLastName(answer.getValue() as string);
        }

        if (answer.getKey() === 'mobile_number') {
          customer.setMobileNumber(answer.getValue() as string);
        }
      });

      return customer;
    }
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }

  throw new NotFoundException();
}
