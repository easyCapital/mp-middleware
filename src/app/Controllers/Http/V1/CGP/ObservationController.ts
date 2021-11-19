import { Filters, ObservationDTO } from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class CGPObservationController {
  public async search({ params, request, response, backendApi }: Context): Promise<void> {
    const { study } = params;
    const filters = request.input('filters') as Filters;

    const observations = await backendApi.searchObservations(study, filters);

    response.status(200).send(observations);
  }

  public async create({ params, request, response, backendApi }: Context): Promise<void> {
    const { study } = params;
    const data = request.post() as ObservationDTO;

    const observation = await backendApi.createObservation(study, data);

    response.status(200).send(observation);
  }

  public async edit({ params, request, response, backendApi }: Context): Promise<void> {
    const { study, observation } = params;
    const data = request.post() as ObservationDTO;

    const updatedObservation = await backendApi.editObservation(study, observation, data);

    response.status(200).send(updatedObservation);
  }

  public async delete({ params, response, backendApi }: Context): Promise<void> {
    const { study, observation } = params;

    await backendApi.deleteObservation(study, observation);

    response.status(200).send();
  }

  public async reorder({ params, request, response, backendApi }: Context): Promise<void> {
    const { study } = params;
    const data = request.post() as number[];

    const updatedObservations = await backendApi.reorderObservations(study, data);

    response.status(200).send(updatedObservations);
  }
}

export = CGPObservationController;
