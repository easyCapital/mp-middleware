import * as PrismicApi from '../../../../Api/Prismic';
import { Context } from '../../../../../types';

class ObjectiveController {
  public async index({ request, response }: Context) {
    const orderBy = request.input('orderBy');
    const filters = request.input('filters');

    const objectives = await PrismicApi.getObjectives(filters, orderBy);

    response.status(200).send(objectives);
  }

  public async get({ params, response }: Context) {
    const { id } = params;

    const objective = await PrismicApi.getObjective(id);

    response.status(200).send(objective);
  }

  public async search({ request, response }: Context) {
    const filters = request.input('filters');
    const orderBy = request.input('orderBy');

    const objectives = await PrismicApi.findObjectives(filters, orderBy);

    response.status(200).send(objectives);
  }

  public async find({ request, response }: Context) {
    const filters = request.input('filters');

    const objective = await PrismicApi.findObjective(filters);

    response.status(200).send(objective);
  }
}

export = ObjectiveController;
