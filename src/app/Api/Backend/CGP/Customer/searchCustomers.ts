import { Filters, Pagination, Meta } from '@robinfinance/js-api';

import { Customer } from '../../../../Models/Customer';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import { formatMeta } from '../../Helpers';
import BackendApi from '../..';

export default async function searchCustomers(
  this: BackendApi,
  pagination: Pagination = { page: 1, perPage: 100 },
  filters?: Filters,
): Promise<{ results: Customer[]; meta: Meta }> {
  try {
    const response = await this.backendClient.get({
      url: 'customer/cgp/search',
      filters,
      pagination,
      orderBy: { key: 'last_modified', type: 'desc' },
    });

    const data = await response.json();
    const meta = formatMeta(response.headers, pagination);

    const customers: Map<string, Customer> = new Map();
    const customerIds: string[] = [];

    data.forEach(item => {
      const customer = new Customer(item);

      customers.set(customer.getId().toString(), customer);
      customerIds.push(customer.getId().toString());
    });

    if (customerIds.length > 0) {
      let answers: { [userId: string]: { [key: string]: string } } = {};

      const answersResponse = await this.getCGPAnswersByCustomer({
        user_id__in: customerIds,
        question_id__in: ['DQ7', 'DQ6', 'mobile_number'],
      });

      answers = answersResponse.results;

      const answerResponsePromises: Promise<{
        results: { [userId: string]: { [key: string]: string } };
        meta: Meta;
      }>[] = [];

      if (answersResponse.meta.nextPage && answersResponse.meta.totalPages) {
        for (let nextPage = answersResponse.meta.nextPage; nextPage <= answersResponse.meta.totalPages; nextPage += 1) {
          answerResponsePromises.push(
            this.getCGPAnswersByCustomer(
              {
                user_id__in: customerIds,
                question_id__in: ['DQ7', 'DQ6', 'mobile_number'],
              },
              { page: nextPage, perPage: answersResponse.meta.perPage },
            ),
          );
        }
      }

      const answerResponses = await Promise.all(answerResponsePromises);

      answerResponses.forEach(answerResponse => {
        answers = { ...answers, ...answerResponse.results };
      });

      Object.keys(answers).forEach(customerId => {
        const customer = customers.get(customerId);
        const customerAnswers = answers[customerId];

        if (customer && customerAnswers) {
          customer.setFirstName(customerAnswers.DQ7);
          customer.setLastName(customerAnswers.DQ6);
          customer.setMobileNumber(customerAnswers.mobile_number);
        }
      });
    }

    return { results: Array.from(customers.values()), meta };
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
