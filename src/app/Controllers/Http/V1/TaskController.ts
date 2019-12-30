import { Filters, TaskTypes, FileTypes } from '@robinfinance/js-api';

import { Context } from '../../../../types';
import { Question } from '../../../Models/Onboarding';
import { Task } from '../../../Models/Contract';
import { File } from '../../../Models/File';
import { FileTypeKeyMapper, FileTypeMapper } from '../../../Mappers/File';

class TaskController {
  public async complementaryQuestions({ params, request, response, backendApi }: Context) {
    const { contract } = params;
    const filters = (request.input('filters') || {}) as Filters;

    const formattedFilters: Filters = contract
      ? { ...filters, type: TaskTypes.QUESTION, contract }
      : { ...filters, type: TaskTypes.QUESTION };

    const tasks: Task<Question>[] = await backendApi.getContractTasks(formattedFilters);

    const questionIds = tasks.map(task => task.getKey());

    if (questionIds.length > 0) {
      const questions = await backendApi.getQuestions(undefined, questionIds);

      tasks.forEach(task => {
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

    const formattedFilters: Filters = contract
      ? { ...filters, type: TaskTypes.FILE, contract }
      : { ...filters, type: TaskTypes.FILE };

    const tasks: Task<File>[] = await backendApi.getContractTasks(formattedFilters);

    const fileTypes = tasks.map(task => FileTypeKeyMapper.transformValue(task.getKey()));

    if (fileTypes.length > 0) {
      const files = await backendApi.getFiles({ type__in: fileTypes });

      tasks.forEach(task => {
        const taskKey = FileTypeKeyMapper.transformValue(task.getKey());

        const file = files.find(item => FileTypeMapper.reverseTransform(item.getType() as FileTypes) === taskKey);

        if (taskKey) {
          const key = FileTypeMapper.transformValue(taskKey);

          if (key) {
            task.setKey(key);
          }
        }

        if (file) {
          task.setData(file);
        }
      });
    }

    response.status(200).send(Object.values(tasks));
  }

  public async signatureUrl({ params, response, backendApi }: Context) {
    const { contract } = params;

    const url = await backendApi.getSignatureUrl(contract);

    response.status(200).send(url);
  }

  public async validateSignature({ params, response, backendApi }: Context) {
    const { contract } = params;

    const data = await backendApi.validateSignature(contract);

    response.status(200).send(data);
  }
}

export = TaskController;
