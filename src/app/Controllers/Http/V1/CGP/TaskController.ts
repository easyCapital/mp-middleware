import { Filters, TaskTypes, TaskStatuses, FileTypes } from '@robinfinance/js-api';

import { Context } from '../../../../../types';
import { File } from '../../../../Models/File';
import { Task } from '../../../../Models/Task';
import { Question } from '../../../../Models/Onboarding';
import { FileTypeMapper } from '../../../../Mappers/File';

class CGPTaskController {
  public async search({ params, request, response, backendApi }: Context) {
    const { contract } = params;
    const filters = request.input('filters') as Filters;

    const contracts = await backendApi.getGCPContractTasks(contract, filters);

    response.status(200).send(contracts);
  }

  public async complementaryQuestions({ params, request, response, backendApi }: Context) {
    const { contract } = params;
    const configKey = request.input('config-key');

    const tasks: Task<Question>[] = await backendApi.getGCPContractTasks(contract, {
      type: TaskTypes.QUESTION,
      status: [TaskStatuses.TODO, TaskStatuses.PENDING],
    });

    const questionIds = tasks.map((task) => task.getKey());

    if (questionIds.length > 0) {
      const questions = await backendApi.getQuestions(configKey, questionIds);

      tasks.forEach((task) => {
        const question = questions[task.getKey()];

        if (question) {
          task.setData(question);
        }
      });

      tasks.sort((a, b) => Object.keys(questions).indexOf(a.getKey()) - Object.keys(questions).indexOf(b.getKey()));
    }

    response.status(200).send(Object.values(tasks));
  }

  public async supportingDocuments({ params, request, response, backendApi }: Context) {
    const { contract } = params;
    const filters = request.input('filters') as Filters;

    const tasks: Task<File>[] = await backendApi.getGCPContractTasks(contract, {
      type: TaskTypes.FILE,
      status: [TaskStatuses.TODO, TaskStatuses.PENDING],
    });

    const fileTypes = tasks.map((task) => FileTypeMapper.reverseTransform(task.getKey() as FileTypes));

    if (fileTypes.length > 0) {
      const files = await backendApi.getCGPCustomerFiles({ ...filters, type__in: fileTypes });

      tasks.forEach((task) => {
        const file = files.find((item) => (item.getType() as FileTypes) === task.getKey());

        if (file) {
          task.setData(file);
        }
      });
    }

    response.status(200).send(Object.values(tasks));
  }
}

export = CGPTaskController;
