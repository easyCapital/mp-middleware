import * as PrismicApi from '../../../../Api/Prismic';
import { InvalidArgumentException } from '../../../../Exceptions';
import { Context } from '../../../../../types';

class ObjectiveController {
  public async index({ request, response }: Context) {
    const orderBy = request.input('orderBy');

    const objectives = await PrismicApi.getObjectives(orderBy);

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

    if (!filters) {
      throw new InvalidArgumentException("Aucun filtre n'a été fourni");
    }

    const objectives = await PrismicApi.findObjectives(filters, orderBy);

    response.status(200).send(objectives);
  }

  public async find({ request, response }: Context) {
    const filters = request.input('filters');

    if (!filters) {
      throw new InvalidArgumentException("Aucun filtre n'a été fourni");
    }

    const objective = await PrismicApi.findObjective(filters);

    response.status(200).send(objective);
  }
}

export = ObjectiveController;
