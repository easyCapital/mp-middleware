import * as PrismicApi from '../../../../Api/Prismic';
import { InvalidArgumentException } from '../../../../Exceptions';
import { Context } from '../../../../../types';

class ProductTypeController {
  public async index({ response }: Context) {
    const types = await PrismicApi.getTypes();

    response.status(200).send(types);
  }

  public async get({ params, response }: Context) {
    const { id } = params;

    const type = await PrismicApi.getType(id);

    response.status(200).send(type);
  }

  public async search({ request, response }: Context) {
    const filters = request.input('filters');

    if (!filters) {
      throw new InvalidArgumentException("Aucun filtre n'a été fourni");
    }

    const types = await PrismicApi.findTypes(filters);

    response.status(200).send(types);
  }

  public async find({ request, response }: Context) {
    const filters = request.input('filters');

    if (!filters) {
      throw new InvalidArgumentException("Aucun filtre n'a été fourni");
    }

    const type = await PrismicApi.findType(filters);

    response.status(200).send(type);
  }
}

export = ProductTypeController;
