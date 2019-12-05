import { Filters, TaskTypes } from '@robinfinance/js-api';

import { Context } from '../../../../types';

class TaskController {
  public async complementaryQuestions({ params, request, response, backendApi }: Context) {
    const { contract } = params;
    const filters = (request.input('filters') || {}) as Filters;

    const formattedFilters: Filters = contract
      ? { ...filters, type: TaskTypes.QUESTION, contract }
      : { ...filters, type: TaskTypes.QUESTION };

    const tasks = await backendApi.getContractTasks(formattedFilters);

    const questionIds = tasks.map(task => task.getKey());
    let questions = {};

    if (questionIds.length > 0) {
      questions = await backendApi.getQuestions(questionIds);
    }

    response.status(200).send(Object.values(questions));
  }
}

export = TaskController;
