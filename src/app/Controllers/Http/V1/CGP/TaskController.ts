import { Filters, TaskTypes, TaskStatuses } from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class CGPTaskController {
  public async search({ params, request, response, backendApi }: Context) {
    const { contract } = params;
    const filters = request.input('filters') as Filters;

    const contracts = await backendApi.getGCPContractTasks(contract, filters);

    response.status(200).send(contracts);
  }

  public async complementaryQuestions({ params, response, backendApi }: Context) {
    const { contract } = params;

    const tasks = await backendApi.getGCPContractTasks(contract, {
      type: TaskTypes.QUESTION,
      status: TaskStatuses.TODO,
    });

    const questionIds = tasks.map(task => task.getKey());
    let questions = {};

    if (questionIds.length > 0) {
      questions = await backendApi.getQuestions(questionIds);
    }

    response.status(200).send(Object.values(questions));
  }
}

export = CGPTaskController;
