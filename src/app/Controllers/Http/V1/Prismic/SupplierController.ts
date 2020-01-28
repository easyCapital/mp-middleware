import * as PrismicApi from '../../../../Api/Prismic';
import { InvalidArgumentException } from '../../../../Exceptions';
import { Context } from '../../../../../types';

class SupplierController {
  public async index({ response }: Context) {
    const suppliers = await PrismicApi.getSuppliers();

    response.status(200).send(suppliers);
  }

  public async get({ params, response }: Context) {
    const { id } = params;

    const supplier = await PrismicApi.getSupplier(id);

    response.status(200).send(supplier);
  }

  public async search({ request, response }: Context) {
    const filters = request.input('filters');

    if (!filters) {
      throw new InvalidArgumentException("Aucun filtre n'a été fourni");
    }

    const suppliers = await PrismicApi.findSuppliers(filters);

    response.status(200).send(suppliers);
  }

  public async find({ request, response }: Context) {
    const filters = request.input('filters');

    if (!filters) {
      throw new InvalidArgumentException("Aucun filtre n'a été fourni");
    }

    const supplier = await PrismicApi.findSupplier(filters);

    response.status(200).send(supplier);
  }
}

export = SupplierController;
