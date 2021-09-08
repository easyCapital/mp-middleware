import { Filters, StudyDTO } from '@robinfinance/js-api';

import { Context } from '../../../../../types';
import { Study } from '../../../../Models/Study';
import { InvalidArgumentException } from '../../../../Exceptions';

class CGPStudyController {
  public async create({ params, request, response, backendApi }: Context): Promise<void> {
    const { customer } = params;
    const { title, coSubscriber } = request.post() as StudyDTO;

    if (!title) {
      throw new InvalidArgumentException("Le titre de l'étude est obligatoire.");
    }

    const contracts = await backendApi.createCGPStudy(customer, title, coSubscriber);

    response.status(201).send(contracts);
  }

  public async search({ params, request, response, backendApi }: Context): Promise<void> {
    const { customer } = params;
    const filters = request.input('filters') as Filters;

    const studies: Study[] = await backendApi.getCGPCustomerStudies(customer, filters);

    response.status(200).send(studies);
  }

  public async edit({ params, request, response, backendApi }: Context): Promise<void> {
    const { customer, study } = params;
    const data = request.post() as StudyDTO;

    const updatedStudy = await backendApi.editCGPCustomerStudy(customer, study, data);

    response.status(200).send(updatedStudy);
  }

  public async finishTask({ params, response, backendApi }: Context): Promise<void> {
    const { customer, study, task } = params;

    await backendApi.finishStudyTask(customer, study, task);

    response.status(200).send();
  }
}

export = CGPStudyController;
