import { Filters, ObservationDTO } from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class CGPObservationController {
  public async search({ params, request, response, backendApi }: Context) {
    const { customer, study } = params;
    const filters = request.input('filters') as Filters;

    const observations = await backendApi.searchObservations(customer, study, filters);

    response.status(200).send(observations);
  }

  public async create({ params, request, response, backendApi }: Context) {
    const { customer, study } = params;
    const data = request.post() as ObservationDTO;

    const observation = await backendApi.createObservation(customer, study, data);

    response.status(200).send(observation);
  }
}

export = CGPObservationController;
