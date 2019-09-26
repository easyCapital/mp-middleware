import * as PrismicApi from '../../../Api/Prismic';
import { InvalidArgumentException } from '../../../Exceptions';

class SupplierController {
  public async index({ response }) {
    const suppliers = await PrismicApi.getSuppliers();

    response.status(200).send(suppliers);
  }

  public async get({ params, response }) {
    const { slug } = params;

    const supplier = await PrismicApi.getSupplier(slug);

    response.status(200).send(supplier);
  }

  public async search({ request, response }) {
    const filters = request.input('filters');

    if (!filters) {
      throw new InvalidArgumentException("Aucun filtre n'a été fourni");
    }

    const suppliers = await PrismicApi.findSuppliers(filters);

    response.status(200).send(suppliers);
  }
}

export = SupplierController;
