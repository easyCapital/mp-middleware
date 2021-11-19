import { Filters, StudyDTO } from '@robinfinance/js-api';

import { Context } from '../../../../../types';
import { InvalidArgumentException } from '../../../../Exceptions';

class CGPStudyController {
  public async create({ params, request, response, backendApi }: Context): Promise<void> {
    const { customer } = params;
    const { title, coSubscriber } = request.post() as StudyDTO;

    if (!title) {
      throw new InvalidArgumentException("Le titre de l'étude est obligatoire.");
    }

    const study = await backendApi.createStudy(customer, title, coSubscriber);

    response.status(201).send(study);
  }

  public async get({ params, response, backendApi }: Context): Promise<void> {
    const { study: id } = params;

    const study = await backendApi.getStudy(id);

    response.status(200).send(study);
  }

  public async edit({ params, request, response, backendApi }: Context): Promise<void> {
    const { study: id } = params;
    const data = request.post() as StudyDTO;

    const study = await backendApi.editStudy(id, data);

    response.status(200).send(study);
  }

  public async update({ params, response, backendApi }: Context): Promise<void> {
    const { study: id } = params;

    const study = await backendApi.updateStudy(id);

    response.status(200).send(study);
  }

  public async search({ params, request, response, backendApi }: Context): Promise<void> {
    const { household } = params;
    const filters = request.input('filters') as Filters;

    const studies = await backendApi.getHouseholdStudies(household, filters);

    response.status(200).send(studies);
  }

  public async finishTask({ params, response, backendApi }: Context): Promise<void> {
    const { study, task } = params;

    await backendApi.finishStudyTask(study, task);

    response.status(200).send();
  }
}

export = CGPStudyController;
