import { Filters, FileType } from '@robinfinance/js-api';

import { Context } from '../../../../types';
import { File } from '../../../Models/File';

class FileController {
  public async search({ params, request, response, backendApi }: Context) {
    const { contract } = params;
    const filters = request.input('filters') as Filters;

    const formattedFilters: Filters = contract ? { ...filters, contracts: contract } : filters;

    const files = await backendApi.getFiles(formattedFilters);

    response.status(200).send(files);
  }

  public async create({ request, response, backendApi }: Context) {
    const data: any = request.post();

    const files: File[] = [];
    const errors = {};

    for await (const key of Object.keys(data)) {
      try {
        const file = await backendApi.createFile(key as FileType, data[key]);

        files.push(file);
      } catch (exception) {
        errors[key] = exception.message;
      }
    }

    if (Object.keys(errors).length > 0) {
      response.status(400).send(errors);
    } else {
      response.status(200).send(files);
    }
  }
}

export = FileController;
