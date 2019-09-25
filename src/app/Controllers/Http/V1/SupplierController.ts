import * as PrismicApi from '../../../Api/Prismic';
import { InvalidArgumentException } from '../../../Exceptions';

class SupplierController {
  public async index({ response }) {
    const data = await PrismicApi.getSuppliers();

    response.status(200).send(data);
  }

  public async get({ params, response }) {
    const { slug } = params;

    const data = await PrismicApi.getSupplier(slug);

    response.status(200).send(data);
  }

  public async search({ request, response }) {
    const filters = request.input('filters');

    if (!filters) {
      throw new InvalidArgumentException("Aucun filtre n'a été fourni");
    }

    const data = await PrismicApi.findSuppliers(filters);

    response.status(200).send(data);
  }
}

export = SupplierController;
