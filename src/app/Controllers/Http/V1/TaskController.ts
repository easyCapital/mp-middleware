import { Filters, TaskTypes, FileTypes } from '@robinfinance/js-api';

import { Context } from '../../../../types';
import { Question } from '../../../Models/Onboarding';
import { Task } from '../../../Models/Task';
import { File } from '../../../Models/File';
import { FileTypeMapper } from '../../../Mappers/File';

class TaskController {
  public async complementaryQuestions({ params, request, response, backendApi }: Context): Promise<void> {
    const { contract } = params;
    const filters = (request.input('filters') || {}) as Filters;

    const formattedFilters: Filters = contract
      ? { ...filters, type: TaskTypes.QUESTION, contract }
      : { ...filters, type: TaskTypes.QUESTION };

    const tasks: Task<Question>[] = await backendApi.getContractTasks(formattedFilters);

    const questionIds = tasks.map((task) => task.getKey());

    if (questionIds.length > 0) {
      const questions = await backendApi.getQuestions(undefined, questionIds);

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

  public async supportingDocuments({ params, request, response, backendApi }: Context): Promise<void> {
    const { contract } = params;
    const filters = request.input('filters') as Filters;

    const formattedFilters: Filters = contract
      ? { ...filters, type: TaskTypes.FILE, contract }
      : { ...filters, type: TaskTypes.FILE };

    const tasks: Task<File>[] = await backendApi.getContractTasks(formattedFilters);

    const fileTypes = tasks.map((task) => FileTypeMapper.reverseTransform(task.getKey() as FileTypes));

    if (fileTypes.length > 0) {
      const files = await backendApi.getFiles({ type__in: fileTypes });

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

export = TaskController;
