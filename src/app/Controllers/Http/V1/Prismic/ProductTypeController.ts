import * as PrismicApi from '../../../../Api/Prismic';
import { InvalidArgumentException } from '../../../../Exceptions';
import { Context } from '../../../../../types';

class ProductTypeController {
  public async index({ response }: Context) {
    const types = await PrismicApi.getTypes();

    response.status(200).send(types);
  }

  public async get({ params, response }: Context) {
    const { slug } = params;

    const type = await PrismicApi.getType(slug);

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
}

export = ProductTypeController;
