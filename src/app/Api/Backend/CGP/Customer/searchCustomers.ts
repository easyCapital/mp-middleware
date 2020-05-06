import { Filters, Pagination, Meta } from '@robinfinance/js-api';

import { Customer } from '../../../../Models/Customer';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import { formatMeta } from '../../Helpers';
import BackendApi from '../..';
import { Task } from '../../../../Models/Task';

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
    const customerIds: number[] = [];

    data.forEach((item) => {
      const customer = new Customer(item);

      customers.set(customer.getId().toString(), customer);
      customerIds.push(customer.getId());
    });

    if (customerIds.length > 0) {
      const dataPromises: Promise<any>[] = [this.getLatestCustomerTask(customerIds)];

      // CREATE ALL THE ANWER PROMISES
      const answersResponse = await this.getCGPAnswersByCustomer({
        user_id__in: customerIds,
        question_id__in: ['DQ7', 'DQ6', 'mobile_number'],
      });

      if (answersResponse.meta.nextPage && answersResponse.meta.totalPages) {
        for (let nextPage = answersResponse.meta.nextPage; nextPage <= answersResponse.meta.totalPages; nextPage += 1) {
          dataPromises.push(
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

      const [tasks, ...answerResponses] = await Promise.all(dataPromises);

      // SET CUSTOMER ANSWERS
      let answers: { [customerId: string]: { [key: string]: string } } = { ...answersResponse.results };

      answerResponses.forEach((answerResponse) => {
        answers = { ...answers, ...answerResponse.results };
      });

      Object.keys(answers).forEach((customerId) => {
        const customer = customers.get(customerId);
        const customerAnswers = answers[customerId];

        if (customer && customerAnswers) {
          customer.setFirstName(customerAnswers.DQ7);
          customer.setLastName(customerAnswers.DQ6);
          customer.setMobileNumber(customerAnswers.mobile_number);
        }
      });

      // SET CUSTOMER TASKS
      Object.keys(tasks).forEach((customerId) => {
        const customer = customers.get(customerId);
        const customerTask = tasks[customerId] as Task<any>;

        if (customer && customerTask) {
          customer.setActiveTask(customerTask.getLabel());
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
