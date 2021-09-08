import { Filters, ObservationDTO } from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class CGPObservationController {
  public async search({ params, request, response, backendApi }: Context): Promise<void> {
    const { customer, study } = params;
    const filters = request.input('filters') as Filters;

    const observations = await backendApi.searchObservations(customer, study, filters);

    response.status(200).send(observations);
  }

  public async create({ params, request, response, backendApi }: Context): Promise<void> {
    const { customer, study } = params;
    const data = request.post() as ObservationDTO;

    const observation = await backendApi.createObservation(customer, study, data);

    response.status(200).send(observation);
  }

  public async edit({ params, request, response, backendApi }: Context): Promise<void> {
    const { customer, study, observation } = params;
    const data = request.post() as ObservationDTO;

    const updatedObservation = await backendApi.editObservation(customer, study, observation, data);

    response.status(200).send(updatedObservation);
  }

  public async delete({ params, response, backendApi }: Context): Promise<void> {
    const { customer, study, observation } = params;

    await backendApi.deleteObservation(customer, study, observation);

    response.status(200).send();
  }

  public async reorder({ params, request, response, backendApi }: Context): Promise<void> {
    const { customer, study } = params;
    const data = request.post() as number[];

    const updatedObservations = await backendApi.reorderObservations(customer, study, data);

    response.status(200).send(updatedObservations);
  }
}

export = CGPObservationController;
