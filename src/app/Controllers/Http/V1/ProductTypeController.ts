import * as PrismicApi from '../../../Api/Prismic';
import { InvalidArgumentException } from '../../../Exceptions';

class ProductTypeController {
  public async index({ response }) {
    const types = await PrismicApi.getTypes();

    response.status(200).send(types);
  }

  public async get({ params, response }) {
    const { slug } = params;

    const type = await PrismicApi.getType(slug);

    response.status(200).send(type);
  }

  public async search({ request, response }) {
    const filters = request.input('filters');

    if (!filters) {
      throw new InvalidArgumentException("Aucun filtre n'a été fourni");
    }

    const types = await PrismicApi.findTypes(filters);

    response.status(200).send(types);
  }
}

export = ProductTypeController;
